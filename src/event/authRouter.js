import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authRoutes = express.Router()

authRoutes.get('/check-auth', (req, res) => {
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

export default authRoutes
