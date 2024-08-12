import express from 'express'
import { userSchema } from '../validator/validation.js'
import { validateRequest } from '../middlewares/validateRequest.js'
import User from '../models/userModel.js'

const userRoutes = express.Router()

userRoutes.post('/register', validateRequest(userSchema), async (req, res) => {
   try {
      const { name, email, password } = req.body
      const newUser = new User({ name, email, password })
      await newUser.save()

      res.status(201).json({ message: 'User registered successfully!' })
   } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err.message })
   }
})

userRoutes.get('/test', (req, res) => {
   res.status(200).json({ message: 'Test route is working!' })
})

export default userRoutes
