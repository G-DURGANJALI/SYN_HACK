import mongoose from "mongoose"

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  contact_Number: String,
  Hostel_Name: {
    type: String,
    enum: ["Hostel A", "Hostel B", "Hostel C"], 
  },
  profilePic: String,
  
}, { timestamps: true });


const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin;
