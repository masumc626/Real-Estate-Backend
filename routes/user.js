// const express = require('express');
// const jwt = require('../middlewares/jwt');
// const connection = require('../db/connection');
// const upload = require('../middlewares/multer');
// const mongoose = require('mongoose');
// const app = express();
// app.use(express.json());
// const userSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   password: { type: String, required: true }
// });
// const User = mongoose.model('User', userSchema);
// app.post('/signin', async (req, res) => {
//   const { userId, password } = req.body;
//   try {
//     const user = await User.findOne({ userId });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials. Sign-in failed.' });
//     }
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials. Sign-in failed.' });
//     }
//     const token = jwt.generateToken();
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });
// app.post('/signup', upload, async (req, res) => {
//   const { userId, password, confirmPassword } = req.body;
//   try {
//     const existingUser = await User.findOne({ userId });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists.' });
//     }
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match.' });
//     }
//     const newUser = new User({
//       userId,
//       password
//     });
//     await newUser.save();
//     const token = jwt.generateToken();
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
// connection();
const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../db/connection');
const upload = require('../middlewares/multer');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);
app.post('/signin', async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials. Sign-in failed.' });
    }
    const token = generateToken();
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
app.post('/signup', upload, async (req, res) => {
  const { userId, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }
    const newUser = new User({
      userId,
      password
    });
    await newUser.save();
    const token = generateToken();
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
const generateToken = () => {
  const payload = {
    data: {
      userId: '123456789',
      email: 'exampleUser'
    }
  };
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey);
  return token;
};
module.exports = app;





