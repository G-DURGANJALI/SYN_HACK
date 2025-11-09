import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema({
  url: { type: String, required: true }, // File URL (local path, Cloudinary, S3, etc.)
  filename: { type: String },
  mimeType: { type: String },
  fileType: {
    type: String,
    enum: ["image", "audio"], // Only allow image or audio
    required: true
  },
  size: { type: Number }, // Optional, in bytes
  uploadedAt: { type: Date, default: Date.now }
}, { _id: false });

const ComplaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  Room_Number: { type: String, required: true },
  Hostel_Name: {
    type: String,
    enum: ["V.G. Bhide", "M.S. Swaminathan", "Anandibai Joshi"],
  },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'resolved', 'In Progress'], 
    default: 'pending' 
  },
  category: { 
    type: String, 
    enum: ['Electrical', 'Maintenance', 'Technical'], 
    required: true 
  },
  subject: { type: String, required: true },

  // Updated field for attachments
  attachments: { type: [attachmentSchema], default: [] },

  tokenNumber: { type: Number, unique: true, index: true },
  studentAvailability: { type: String, required: true },  // e.g., "After 6pm this week"
  workerAssigned: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
  scheduledTime: { type: String }, // optional specific time once assigned


  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Complaint = mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);

export default Complaint;


