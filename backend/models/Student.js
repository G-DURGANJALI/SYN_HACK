import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  student_id: { type: String, required: true, unique: true },
  Hostel_Name: { type: String , required: true },
  Room_Number: { type: String , required: true },
  contact_Number: { type: String , required: true },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);


export default Student;