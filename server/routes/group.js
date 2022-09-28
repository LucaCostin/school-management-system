import express from 'express';

import { createGroup, getGroups } from '../controllers/admin.js'
import verifyAuth from '../middleware/verifyAuth.js'

const router = express.Router();

router.post('/createGroup', verifyAuth, createGroup);
router.get('/getGroups', verifyAuth, getGroups);

export default router;
