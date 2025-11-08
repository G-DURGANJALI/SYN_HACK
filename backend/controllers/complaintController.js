import Counter from "../models/Counter.js";
import Complaint from "../models/Complaint.js";

import Student from "../models/student.js";

async function getNextTokenNumber() {
  const counter = await Counter.findOneAndUpdate(
    { name: "complaintToken" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

export const createComplaint = async (req, res) => {
  try {
    const { subject, description, category, studentAvailability } = req.body;
    if (!subject || !description || !category || !studentAvailability) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const tokenNumber = await getNextTokenNumber();

    const complaint = await Complaint.create({
      studentId: req.student._id,
      Room_Number: req.student.Room_Number,
      Hostel_Name: req.student.Hostel_Name,
      subject,
      description,
      category,
      status: "pending",
      studentAvailability,
      tokenNumber,
    });

    res.status(201).json({ success: true, complaint });
  } catch (error) {
    console.error("createComplaint error:", error);
    res.status(500).json({ success: false, message: "Failed to create complaint" });
  }
};
