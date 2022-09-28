import mongoose from 'mongoose';

import User from "../models/user.js";
import Group from "../models/group.js";

export const createUser = async (req, res) => {
  const isAdmin = req.isAdmin;
  const user = req.body;

  const { email } = user;
  const existingUser = await User.findOne({ email });

  let userGroup = user.group;

  if(typeof userGroup === 'string'){
    userGroup = [userGroup];
  }

  let group;
  console.log(userGroup);

  if(user.group !== undefined && user.group.length > 0) {
    for(let i = 0; i < userGroup.length; i++) {
      try{
        group = await Group.find({ name: userGroup[i] });
        console.log(group)
        if(user.isTeacher){
          if(group[0].teachers === undefined){
            group[0].teachers = userGroup;
          }else {
            group[0].teachers.push(user.name)
          }
        }
      if(user.isStudent){
        if(group[0].students === undefined){
          group[0].students = userGroup;
        }else {
          group[0].students.push(user.name)
        }
      }
        await group[0].save();
      }catch(err) {
        res.status(500).json({ message:'Oops, looks like something went wrong!' });
        console.log(err);
      }
    }
  }

  if (email === undefined) {
    return res.status(404).json({message: 'Email field is empty!'});
  }
  else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(!email.match(emailRegex)) {
          return res.status(404).json({message: 'Not a valid email address!'});
      }
  }

  if(existingUser)return res.status(404).json({message: 'User email is already registered!'});

  const newUser = new User({
    ...user,
    createdBy: req.userId,
  })

  try {
    if(isAdmin === true) {
      await newUser.save();
      res.status(201).json(newUser);
    }
  }catch(err) {
    res.status(500).json({ message:'Oops, looks like something went wrong!' });
    console.log(err);
  };
}
export const createGroup = async (req, res) => {
  const isAdmin = req.isAdmin;

  const { year, identifier, classes } = req.body;
  if(year === undefined || identifier === undefined || classes === undefined) {
    return res.status(404).json({message: 'Empty fields!'});
  }

  const name = `${year}/${identifier}`;
  console.log(name)
  const existingGroup = await Group.findOne({ name });
  if(existingGroup)return res.status(404).json({message: 'Group already exists!'});

  const newGroup = new Group({
    year,
    identifier,
    name,
    classes,
    createdBy: req.userId,
  })

  try {
    if(isAdmin === true) {
      await newGroup.save();
      res.status(201).json(newGroup);
    }
  }catch(err) {
    res.status(500).json({ message:'Oops, looks like something went wrong!' });
    console.log(err);
  };
}

export const getUsers = async (req, res) => {
  const role = req.params.role;
  const isAdmin = req.isAdmin;

  let users;

  try {
    if(isAdmin === true){
      switch(role){
        case 'admins':
          users = await User.find({ isAdmin: true }).sort({name: 1})
          break
        case 'teachers':
          users = await User.find({ isTeacher: true }).sort({name: 1})
          break
        case 'students':
          users = await User.find({ isStudent: true }).sort({name: 1})
          break
      }
    }

    res.status(201).json(users)
  }catch(err) {
    res.status(500).json({ message:'Oops, looks like something went wrong!' });
    console.log(err);
  };
}
export const getGroups = async (req, res) => {
  const isAdmin = req.isAdmin;

  try {
    if(isAdmin === true){
      const groups = await Group.find().sort({year: 1, identifier: 1});
      res.status(201).json(groups)
    }
  }catch(err) {
    res.status(500).json({ message:'Oops, looks like something went wrong!' });
    console.log(err);
  };
}
export const deleteUser = async (req, res) => {
  const isAdmin = req.isAdmin;
  const { id } = req.params;

  try {
    if(isAdmin === true){
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No user exists with id: ${id}` });
      }

      const user = await User.findById(id);

      let userGroup = user.group;

      if(typeof userGroup === 'string'){
        userGroup = [userGroup];
      }

      let group;
      // console.log(userGroup);

      if(user.group.length > 0) {
        for(let i = 0; i < userGroup.length; i++) {
          try{
            group = await Group.find({ name: userGroup[i] });
            console.log(group)
            if(user.isTeacher){
              const index = group[0].teachers.indexOf(user.name);
              if (index > -1) {
                group[0].teachers.splice(index, 1);
              }
            } else if(user.isStudent){
              const index = group[0].students.indexOf(user.name);
              if (index > -1) {
                group[0].students.splice(index, 1);
              }
          }
            await group[0].save();
          }catch(err) {
            res.status(500).json({ message:'Oops, looks like something went wrong!' });
            console.log(err);
          }
        }
      }

      await user.delete();
      res.status(200).json({message: 'User deleted!'})
    }
  }catch(err) {
    res.status(500).json({ message:'Oops, looks like something went wrong!' });
    console.log(err);
  };
}

export const editUser = async (req, res) => {
  const isAdmin = req.isAdmin;
  const { id } = req.params;
  const { email, name, gender, group, classes } = req.body

  try {
    if(isAdmin === true){
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No user exists with id: ${id}` });
      }

      const user = await User.findById(id);

      // let userGroup = user.group;

      // for(i = 0; i < types.length; i++)

      // if(typeof userGroup === 'string'){
      //   userGroup = [userGroup];
      // }

      // let _group;
      // // console.log(userGroup);

      // if(user.group.length > 0) {
      //   for(let i = 0; i < userGroup.length; i++) {
      //     try{
      //       _group = await Group.find({ name: userGroup[i] });
      //       console.log(_group)
      //       if(user.isTeacher){
      //         const index = _group[0].teachers.indexOf(user.name);
      //         if (index > -1) {
      //           _group[0].teachers.splice(index, 1);
      //         }
      //       } else if(user.isStudent){
      //         const index = _group[0].students.indexOf(user.name);
      //         if (index > -1) {
      //           _group[0].students.splice(index, 1);
      //         }
      //     }
      //       await _group[0].save();
      //     }catch(err) {
      //       res.status(500).json({ message:'Oops, looks like something went wrong!' });
      //       console.log(err);
      //     }
      //   }
      // }

      user.name = name;
      user.email = email;
      user.group = group;
      user.classes = classes;
      user.gender = gender;

      await user.save();
      res.json(user);
    }
  }catch(err) {
    res.status(500).json({ message:'Oops, looks like something went wrong!' });
    console.log(err);
  };
}
