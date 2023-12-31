import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

//@route POST /api/users/login

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password")
    }
})

//@route POST /api/users

const registerUser = asyncHandler(async (req, res) => {
    const { name,email, password } = req.body;

    const userExists = await User.findOne({ email });
  if(userExists){
      res.status(400);
      throw new Error('user already exists')
  }
  const user=await User.create({email,name,password});
  if(user){
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })
    }else{
        res.status(400);
        throw new Error('invalid user data')
  }
})


export { authUser ,registerUser}
