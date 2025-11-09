import Student from '../models/student.js';
import Complaint from '../models/Complaint.js';
import cloudinary from 'cloudinary';
import bcrypt from 'bcryptjs';

// Logout Student
export const logoutStudent = (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const createComplaint = async (req, res) => {
  try {
    const { subject, description, category } = req.body;

    // Validation
    if (!subject || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Subject, description, and category are required.",
      });
    }

    // Ensure the logged-in student exists
    const student = await Student.findById(req.student._id);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    // Handle file uploads (optional, image/audio)
    const attachments = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const mimeType = file.mimetype || "";
        const fileType = mimeType.startsWith("audio") ? "audio" : "image"; // only audio/image allowed

        attachments.push({
          url: file.path,
          filename: file.originalname,
          mimeType,
          fileType,
          size: file.size,
        });
      });
    }

    // Create complaint
    const complaint = await Complaint.create({
      studentId: student._id,
      Room_Number: student.Room_Number,
      Hostel_Name: student.Hostel_Name,
      subject,
      description,
      category,
      status: "pending",
      attachments,
    });

    res.status(201).json({
      success: true,
      message: "Complaint created successfully.",
      complaint,
    });
  } catch (error) {
    console.error("createComplaint error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create complaint.",
    });
  }
};

// Get all complaints (own complaints by default; ?all=true to get all complaints)
export const getAllComplaints = async (req, res) => {
  try {
    const showAll = req.query.all === "true";

    // Filter: show only current student's complaints unless admin or query.all=true
    const filter = showAll ? {} : { studentId: req.student._id };

    const complaints = await Complaint.find(filter)
      .populate("studentId", "name email student_id Hostel_Name Room_Number contact_Number profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error("getAllComplaints error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch complaints.",
    });
  }
};


// Like or unlike a complaint (toggle)
export const likeComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    if (!complaintId) return res.status(400).json({ message: 'Complaint ID required' });

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    const studentIdStr = req.student._id.toString();
    complaint.likedBy = complaint.likedBy || [];

    const alreadyLiked = complaint.likedBy.some(id => id.toString() === studentIdStr);

    if (alreadyLiked) {
      complaint.likedBy = complaint.likedBy.filter(id => id.toString() !== studentIdStr);
      complaint.likes = Math.max(0, (complaint.likes || 0) - 1);
      await complaint.save();
      return res.status(200).json({ success: true, message: 'Complaint unliked', likes: complaint.likes });
    } else {
      complaint.likedBy.push(req.student._id);
      complaint.likes = (complaint.likes || 0) + 1;
      await complaint.save();
      return res.status(200).json({ success: true, message: 'Complaint liked', likes: complaint.likes });
    }
  } catch (error) {
    console.error('likeComplaint error:', error);
    res.status(500).json({ success: false, message: 'Error toggling like' });
  }
};

// Generic "like the system" feedback (simple)
export const likeSystem = async (req, res) => {
  try {
    // Optional: persist to DB if you have a Feedback model; for now just acknowledge
    return res.status(200).json({ success: true, message: 'Thanks for liking the Hostel Management System!' });
  } catch (error) {
    console.error('likeSystem error:', error);
    res.status(500).json({ success: false, message: 'Failed to register like' });
  }
};

// Get student profile/info
export const getStudentInfo = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ success: true, student });
  } catch (error) {
    console.error('getStudentInfo error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch student info' });
  }
};

// Update profile (name, email, profilePic)
export const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const { name, email, roomNo } = req.body;
    if (name) student.name = name;
    if (email) student.email = email;
    if (roomNo) student.roomNo = roomNo; // optional field

    // handle profile picture (upload via multer -> req.file.path)
    if (req.file) {
      // If previously stored on cloudinary, remove. This assumes profilePic stores full cloud path.
      if (student.profilePic) {
        try {
          const publicId = student.profilePic.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`hostel/${publicId}`);
        } catch (e) {
          console.warn('cloudinary delete warning:', e.message);
        }
      }
      student.profilePic = req.file.path;
    }

    await student.save();
    res.status(200).json({ success: true, message: 'Profile updated', student });
  } catch (error) {
    console.error('updateStudentProfile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
};

// Change student password (uses bcrypt compare & hash)
export const changeStudentPassword = async (req, res) => {
  try {
    const studentId = req.student._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const student = await Student.findById(studentId).select('+password');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const isMatch = await bcrypt.compare(currentPassword, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('changeStudentPassword error:', error);
    return res.status(500).json({ success: false, message: 'Error changing password' });
  }
};
