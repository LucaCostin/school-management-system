import express from 'express';

import { logEmail, loginPass, firstLoginPass } from '../controllers/user.js';
import { createUser, getUsers, deleteUser, editUser } from '../controllers/admin.js'
import emailMiddleware from '../middleware/emailMiddleware.js';
import verifyAuth from '../middleware/verifyAuth.js'

const router = express.Router();

router.post('/checkEmail', logEmail);
router.post('/checkPass', emailMiddleware, loginPass);
router.patch('/createPass',emailMiddleware, firstLoginPass);
router.post('/createUser', verifyAuth, createUser);
router.get('/getUsers/:role', verifyAuth, getUsers);
router.delete('/:id', verifyAuth, deleteUser);
router.patch('/:id', verifyAuth, editUser);

export default router;
