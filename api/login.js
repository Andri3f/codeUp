import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../src/models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()

export default async function handler(req, res) {
   if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' })
   }

   const { email, password } = req.body

   try {
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
}
