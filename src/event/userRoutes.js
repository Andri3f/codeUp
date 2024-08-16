import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userSchema, loginSchema } from '../validator/validation.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import { User } from '../models/userModel.js'
import dotenv from 'dotenv'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const userRoutes = express.Router()

const baseURL = process.env.BASE_URL || 'https://main--mybestcodeup.netlify.app'

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
   },
})

const upload = multer({ storage: storage })

function deleteFile(filePath) {
   const fullPath = path.join(__dirname, '../../uploads', filePath)
   fs.unlink(fullPath, (err) => {
      if (err) {
         console.error('Error deleting file:', err)
      }
   })
}

userRoutes.post('/register', validateRequest(userSchema), async (req, res) => {
   try {
      const { name, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({ name, email, password: hashedPassword })
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

userRoutes.post('/update-profile', upload.single('avatar'), async (req, res) => {
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

      const { name, email, phoneNumber } = req.body

      if (name) user.name = name
      if (email) user.email = email
      if (phoneNumber) user.phoneNumber = phoneNumber
      if (req.file) {
         if (user.avatar) {
            deleteFile(user.avatar.split('/uploads/')[1])
         }

         user.avatar = `${baseURL}/uploads/${req.file.filename}`
      }

      await user.save()

      res.status(200).json({ message: 'Profile updated successfully!', avatar: user.avatar })
   } catch (err) {
      res.status(401).json({ message: 'Invalid token' })
   }
})

userRoutes.get('/user-profile', async (req, res) => {
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

      res.status(200).json(user)
   } catch (err) {
      res.status(401).json({ message: 'Invalid token' })
   }
})

userRoutes.get('/check-auth', (req, res) => {
   const token = req.headers.authorization?.split(' ')[1]

   if (!token) {
      return res.json({ isAuthenticated: false })
   }

   try {
      jwt.verify(token, process.env.JWT_SECRET)
      return res.json({ isAuthenticated: true })
   } catch (err) {
      return res.json({ isAuthenticated: false })
   }
})

export default userRoutes
