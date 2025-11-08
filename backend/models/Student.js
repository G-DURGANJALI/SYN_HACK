import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  
  likedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);


export default Student;