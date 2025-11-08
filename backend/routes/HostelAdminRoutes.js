
import express from 'express';

import { isAdmin } from '../middlewares/authMiddleware.js';

import { allComplaints } from '../controllers/hostelAdminController.js';
const router = express.Router();

router.get('/all-complaints', allComplaints);

export default router;