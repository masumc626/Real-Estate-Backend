const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user_info');
const jwt = require('jsonwebtoken')

userRoute.post('/signup', async (req, res) => {
    const userData = req.body;
    if (userData) {
        console.log(req.body)
        try {
          if(userData.password !== userData.confirmPassword){
            return res.status(400).json({
              "status": "failed",
              "message": "password is not matching"
            })
          }
            const encryptedPassword = bcrypt.hashSync(userData.password, 15);
            const data = new User({
                email: userData.email,
                password: encryptedPassword
            });
            await data.save();
            res.status(201).json({ "status": "success" });
        }
        catch (err) {
            res.status(400).json({ "status": err.message });
        }
    }
    else {
        res.status(400).json({ "status": "failed" });
    }
});

userRoute.post('/signin', async (req, res) => {
    const userData = req.body;
    console.log(userData)
    if (userData) {
        try {
            const userDataFromDB = await User.findOne({ email: userData.email });
            if (userDataFromDB) {
                // console.log(userDataFromDB)
                const match = bcrypt.compareSync(userData.password , userDataFromDB.password);
                if (match) {
                    //generating accessToken
                    const accessToken = jwt.sign(
                        {
                            id: userDataFromDB._id,
                            email: userDataFromDB.email,
                        },
                        process.env.ACCESS_TOKEN_KEY,
                        { expiresIn: "20m" }
                    );
                    res.status(200).json({ 
                        "status": "success" ,
                        email: userDataFromDB.email,
                        id: userDataFromDB.id,
                        "token" : accessToken
                    });
                }
                else {
                    res.status(401).json({ "status": "failed" });
                }
            }
            else {
                res.status(401).json({ "status": "failed" });
            }
        }
        catch (err) {
            res.status(401).json({ "status": err.message });
        }
    }
    else {
        res.status(401).json({ "status": "failed" });
    }
});

module.exports = userRoute;


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




// const express = require('express');
// const jwt = require('jsonwebtoken');
// const connection = require('../db/connection');
// const upload = require('../middlewares/multer');
// const mongoose = require('mongoose');
// const userRouter = express.Router();

// // const app = express();

// // userRouter.use(express.json());

// const userSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   password: { type: String, required: true }
// });

// const User = mongoose.model('User', userSchema);

// userRouter.post('/signin', async (req, res) => {
//   const { userId, password } = req.body;
//   console.log(req.body)

//   try {
//     const user = await User.findOne({ userId });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials. Sign-in failed.' });
//     }

//     const token = generateToken();
                
//     res.status(200).json({ token : token , userData : user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

// userRouter.post('/signup', upload, async (req, res) => {
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

//     // const token = generateToken();

//     res.status(201).json({ status : "success", message : "SignedUp successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

// const generateToken = () => {
//   const payload = {
//     data: {
//       userId: '123456789',
//       email: 'exampleUser'
//     }
//   };

//   const secretKey = process.env.SECRET_KEY;
//   const token = jwt.sign(payload, secretKey);

//   return token;
// };

// module.exports = userRouter;


