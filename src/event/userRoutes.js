import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userSchema, loginSchema } from '../validator/validation.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { User } from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()

const userRoutes = express.Router()

userRoutes.post('/register', validateRequest(userSchema), async (req, res) => {
   try {
      const { name, email, password } = req.body
      const newUser = new User({ name, email, password })
      await newUser.save()

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      newUser.token = token
      await newUser.save()

      res.status(201).json({ message: 'User registered successfully!', token })
   } catch (err) {
      console.error('Error registering user:', err)
      res.status(500).json({ message: 'Error registering user', error: err.message })
   }
})

userRoutes.post('/login', validateRequest(loginSchema), async (req, res) => {
   try {
      const { email, password } = req.body
      let user = (await User.findOne({ email })) || (await User.findOne({ phoneNumber: email }))

      if (!user) {
         return res.status(404).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid credentials' })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      user.token = token
      user.lastLogin = new Date()
      await user.save()

      res.status(200).json({ message: 'Login successful', token })
   } catch (err) {
      console.error('Error logging in:', err)
      res.status(500).json({ message: 'Error logging in', error: err.message })
   }
})

userRoutes.post('/update-profile', async (req, res) => {
   const token = req.headers.authorization?.split(' ')[1]

   if (!token) {
      return res.status(401).json({ message: 'No token provided' })
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.userId)

      if (!user) {
         return res.status(404).json({ message: 'User not found' })
      }

      const { name, email, phoneNumber, avatar } = req.body

      if (name) user.name = name
      if (email) user.email = email
      if (phoneNumber) user.phoneNumber = phoneNumber
      if (avatar) user.avatar = avatar

      await user.save()

      res.status(200).json({ message: 'Profile updated successfully!' })
   } catch (err) {
      res.status(401).json({ message: 'Invalid token' })
   }
})

export default userRoutes
