import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { data } from '../sensitive.js';

function generateToken(_user) {
	return jwt.sign({
			"id": _user.id,
			"email": _user.email,
			"name": _user.name,
	}, data.key, {expiresIn: '2h'});
}

export const logEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const result = await User.findOne({ email });

    if(!result) return res.status(404).json({message: 'We couldn\'t find your email in our Database, please contact administrator'});

    let role;

    if(result.isAdmin){
      role = 'Your are logging in as an Administrator!';
    } else if(result.isTeacher){
      role = 'Your are logging in as a Teacher!';
    } else if(result.isStudent){
      role = 'Your are logging in as a Student!';
    }

    let hasPassword;

    if(result.password === undefined) {
      hasPassword = false;
    } else {
      hasPassword = true;
    }

    res.status(200).json({ email, role, hasPassword });
  }catch(err) {
      res.status(500).json({ message:'Oops, looks like something went wrong!' });
			console.log(err);
  };
}

export const loginPass = async (req, res) => {
  const email = req.email;
  const { password } = req.body;

  try {
    if(password.trim() === "") return res.status(400).json({message: 'Empty Password field!'});
    const result = await User.findOne({ email });

    const matchPasswords = await bcrypt.compare(password, result.password);
    if(!matchPasswords) return res.status(400).json({message: 'Wrong password!'});

    const token = generateToken(result);
    res.status(200).json({result, token})
    console.log(result)
  }catch(err) {
    res.status(500).json({ message:'Oops, looks like something went wrong!' });
    console.log(err);
  };
}

export const firstLoginPass = async (req, res) => {
  const email = req.email;
  const { password } = req.body;

  try {
    if(password.trim() === "") return res.status(400).json({message: 'Empty Password field!'});
    const result = await User.findOne({ email });

    const cryptPassword = await bcrypt.hash(password, 12);
    result.password = cryptPassword;

    await result.save();
    const token = generateToken(result);
    res.status(200).json({result, token})
  }catch(err) {
    res.status(500).json({ message:'Oops, looks like something went wrong!' });
    console.log(err);
  };
}
