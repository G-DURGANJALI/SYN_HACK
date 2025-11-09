import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  worker_user_name: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  role: { type: String, enum: ['Electrical', 'Maintenance', 'Technical'], required: true },
  rating: { type: Number, default: 0 },
  contact_Number: { type: String, required: true },

  // 🆕 Worker availability for next day
  availability: [{
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true } // e.g., "2pm-4pm" or "after 6pm"
  }]
}, { timestamps: true });

const Worker = mongoose.models.Worker || mongoose.model('Worker', workerSchema);


export default Worker;