import express from 'express';
import { getDashboard,blockUser,deleteUser } from '../controller/adminController.js';

import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

router.get('/', verifyAdmin, getDashboard);
router.put('/block/:id', verifyAdmin, blockUser);
router.delete('/delete/:id', verifyAdmin, deleteUser);

export default router;
