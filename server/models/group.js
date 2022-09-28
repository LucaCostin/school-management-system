import mongoose from "mongoose";
const { Schema, model } =  mongoose;

const groupSchema = new Schema({
  id: String,
  name: String,
  identifier: String,
  year: String,
  students: [{
    type: String,
    ref: 'users'
  }],
  teachers: [{
    type: String,
    ref: 'users'
  }],
  classes: [String]
})

export default model('Group', groupSchema);
