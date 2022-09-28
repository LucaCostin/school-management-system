import mongoose from "mongoose";
const { Schema, model } =  mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  description: String,
  location: String,
  gender: String,
  id: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  isStudent: Boolean,
  isTeacher: Boolean,
  createdBy: Schema.Types.ObjectId,
  group: [{
    type: String,
    ref: 'groups'
  }],
  classes: [{
    type: String
  }]
});

export default model('User', userSchema);
