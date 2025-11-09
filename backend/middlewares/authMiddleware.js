import jwt from 'jsonwebtoken';

                                                        

export const protectStudent = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id).select('-password');

    if (!student) return res.status(401).json({ message: 'Not authorized' });

    req.student = student;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

export const protectClub = async (req, res, next) => {
  try {

    const token = req.cookies.token;
    
    if (!token) return res.status(401).json({ message: 'Not authorized' });
         
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const club = await Club.findById(decoded.id).select('-password');

    if (!club) return res.status(401).json({ message: 'Not authorized' });

    req.club = club;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

export const isAdmin = (req, res, next) => {
   try{
    const token = req.cookies.token; // assuming you're storing the token in cookies

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, not an admin' });
    }

    // add decoded info to req.user if needed
    req.user = decoded;

    next(); // allow access
   } catch(err)
   {
    res.status(401).json({ message: 'Token invalid' });
   }
};
// done completely

import Worker from "../models/Worker.js";

export const protectWorker = async (req, res, next) => {
  try {
    const token =
      req.cookies?.workerToken ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const worker = await Worker.findById(decoded.id).select("-password");
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    req.worker = worker; // ✅ attach worker to request
    next();
  } catch (error) {
    console.error("protectWorker error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};