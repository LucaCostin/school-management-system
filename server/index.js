import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRouter from './routes/user.js';
import groupRouter from './routes/group.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 3001;

app.use(express.json({ limit: '30mb', extended: true }));

app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to School Management API');
});

app.use('/users', userRouter);
app.use('/groups', groupRouter);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then( () => {
  console.log('DB connection established');
  return app.listen(port);
}).then( () => {
  console.log(`Server running on ${port}`);
}).catch( err => console.log(err) );
