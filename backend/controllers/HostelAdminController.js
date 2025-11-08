import Complaint from "../models/Complaint.js";
import Student from "../models/student.js";

// Get all complaints
export const allComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("studentId", "name email student_id Hostel_Name Room_Number contact_Number profilePic")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error("allComplaints error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch complaints." });
  }
};
