import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  role: { type: String, required: true },
  rating: { type: Number, default: 0 },
  contact_Number: { type: String, required: true },

}, { timestamps: true });

const Worker = mongoose.models.Worker || mongoose.model('Worker', workerSchema);


export default Worker;