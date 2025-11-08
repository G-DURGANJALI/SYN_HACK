import bcrypt from "bcryptjs";
import Student from "../models/student.js";
import Worker from "../models/Worker.js";
import Admin from "../models/HostelAdmin.js";
import generateToken from "../utils/generateToken.js"; // same as your previous project

// ----------------------------- Student ---------------------------------

export const registerStudent = async (req, res) => {
  const {
    name,
    email,
    password,
    student_id,
    Hostel_Name,
    Room_Number,
    contact_Number,
  } = req.body;

  try {
    const existingStudent = await Student.findOne({
      $or: [{ email }, { student_id }],
    });
    if (existingStudent)
      return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let profilePic = "";
    if (req.file) profilePic = req.file.path; // multer-storage-cloudinary

    const newStudent = await Student.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
      student_id,
      Hostel_Name,
      Room_Number,
      contact_Number,
    });

    generateToken(res, newStudent._id, "student");
    res
      .status(201)
      .json({ message: "Student registered successfully", student: newStudent });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginStudent = async (req, res) => {
  const { student_id, password } = req.body;

  try {
    const student = await Student.findOne({ student_id });
    if (!student)
      return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    generateToken(res, student._id, "student");
    res.status(200).json({ message: "Student login success", student });
  } catch (error) {
    console.error("Error logging in student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------- Admin ---------------------------------

export const registerAdmin = async (req, res) => {
  const { name, email, password, Hostel_Name } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePic = "";
    if (req.file) profilePic = req.file.path;

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      Hostel_Name,
      profilePic,
    });

    generateToken(res, newAdmin._id, "admin");
    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    generateToken(res, admin._id, "admin");
    res.status(200).json({ message: "Admin login success", admin });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------- Worker ---------------------------------

export const registerWorker = async (req, res) => {
  const { worker_id, name, password, role, contact_Number } = req.body;

  try {
    const existingWorker = await Worker.findOne({ worker_id });
    if (existingWorker)
      return res.status(400).json({ message: "Worker already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePic = "";
    if (req.file) profilePic = req.file.path;

    const newWorker = await Worker.create({
      worker_id,
      name,
      password: hashedPassword,
      role,
      contact_Number,
      profilePic,
    });

    generateToken(res, newWorker._id, "worker");
    res
      .status(201)
      .json({ message: "Worker registered successfully", worker: newWorker });
  } catch (error) {
    console.error("Error registering worker:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginWorker = async (req, res) => {
  const { worker_id, password } = req.body;

  try {
    const worker = await Worker.findOne({ worker_id });
    if (!worker)
      return res.status(404).json({ message: "Worker not found" });

    const isMatch = await bcrypt.compare(password, worker.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    generateToken(res, worker._id, "worker");
    res.status(200).json({ message: "Worker login success", worker });
  } catch (error) {
    console.error("Error logging in worker:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------- Logout (optional reuse) ---------------------------------
export const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Server error during logout" });
  }
};
