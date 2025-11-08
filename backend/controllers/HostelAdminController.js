import Complaint from "../models/Complaint.js";
import Student from "../models/student.js";
import Worker from "../models/Worker.js";
import mongoose from "mongoose";


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


export const assignComplaintsFIFO = async (req = null, res = null) => {
  try {
    const pendingComplaints = await Complaint.find({ status: "pending" }).sort({ createdAt: 1 });

    for (const complaint of pendingComplaints) {
      const workers = await Worker.find({ role: complaint.category });

      for (const worker of workers) {
        if (!worker.availability) continue;

        const match = worker.availability.find(
          (slot) =>
            complaint.studentAvailability &&
            complaint.studentAvailability.toLowerCase().includes(slot.timeSlot.toLowerCase())
        );

        if (match) {
          complaint.workerAssigned = worker._id;
          complaint.status = "assigned";
          complaint.scheduledTime = match.timeSlot;
          await complaint.save();

          console.log(`✅ Assigned Token #${complaint.tokenNumber} → Worker ${worker.name}`);
          break;
        }
      }
    }

    // Handle both direct and API calls
    if (res)
      return res.status(200).json({ message: "Complaints assigned successfully (FIFO)." });
    else
      return "Job complete";
  } catch (error) {
    console.error("assignComplaintsFIFO error:", error);
    if (res)
      res.status(500).json({ message: "Error assigning complaints." });
    else throw error;
  }
};

