import Student from '../models/student.js';
import Complaint from '../models/Complaint.js';
import cloudinary from 'cloudinary';
import bcrypt from 'bcryptjs';

// Logout Student
export const logoutStudent = (req, res) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};

// Create a new complaint
export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const complaintData = {
      title,
      description,
      createdBy: req.student._id,
      status: 'open',
    };

    if (category) complaintData.category = category;
    if (priority) complaintData.priority = priority;

    // optional: support an image upload for complaint
    if (req.file) complaintData.attachment = req.file.path;

    const complaint = await Complaint.create(complaintData);
    res.status(201).json({ success: true, complaint });
  } catch (error) {
    console.error('createComplaint error:', error);
    res.status(500).json({ success: false, message: 'Failed to create complaint' });
  }
};

// Get all complaints (own complaints by default; ?all=true to get all complaints)
export const getAllComplaints = async (req, res) => {
  try {
    const showAll = req.query.all === 'true';
    const filter = showAll ? {} : { createdBy: req.student._id };

    const complaints = await Complaint.find(filter)
      .populate('createdBy', 'name email roomNo')     // adjust fields to your Student schema
      .populate('assignedTo', 'name email')            // worker details if assigned
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error('getAllComplaints error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch complaints' });
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
