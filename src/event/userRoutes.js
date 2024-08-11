import express from 'express'
import { userSchema } from '../validator/validation.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const userRoutes = express.Router()

userRoutes.post('/register', validateRequest(userSchema), (req, res) => {
   console.log('Request body:', req.body)
   res.status(200).json({ message: 'User registered successfully!' })
})

userRoutes.get('/test', (req, res) => {
   res.status(200).json({ message: 'Test route is working!' })
})

export default userRoutes
