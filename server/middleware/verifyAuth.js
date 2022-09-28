import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js';
import { data } from '../sensitive.js';

const verifyAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const user = jwt.verify(token, data.key);
		const email = user.email;
		const _user = await UserModel.findOne({ email });
		req.userId = _user?._id;
		req.isAdmin = _user?.isAdmin;
		req.isTeacher = _user?.isTeacher;
		req.isStudent = _user?.isStudent;
		next();
	}catch(err) {
		console.log(err);
	};
};

export default verifyAuth;

