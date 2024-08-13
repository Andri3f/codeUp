import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userSchema, loginSchema } from '../validator/validation.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import User from '../models/userModel.js'
import LoginUser from '../models/loginUserModel.js'
import dotenv from 'dotenv'

dotenv.config()

const userRoutes = express.Router()

userRoutes.post('/register', validateRequest(userSchema), async (req, res) => {
   try {
      const { name, email, password } = req.body
      const newUser = new User({ name, email, password })
      await newUser.save()

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      await LoginUser.findOneAndUpdate({ email }, { token }, { upsert: true })

      res.status(201).json({ message: 'User registered successfully!', token })
   } catch (err) {
      console.error('Error registering user:', err)
      res.status(500).json({ message: 'Error registering user', error: err.message })
   }
})

userRoutes.post('/login', validateRequest(loginSchema), async (req, res) => {
   try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
         return res.status(404).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid credentials' })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      await LoginUser.findOneAndUpdate({ email }, { token }, { upsert: true })

      res.status(200).json({ message: 'Login successful', token })
   } catch (err) {
      console.error('Error logging in:', err)
      res.status(500).json({ message: 'Error logging in', error: err.message })
   }
})

export default userRoutes
