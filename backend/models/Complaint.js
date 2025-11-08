import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'resolved', 'In Progress'], default: 'pending' },
  category: { type: String, required: true },
  subject: { type: String, required: true },
  attachments: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  

}, { timestamps: true });

const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);

export default Complaint;

