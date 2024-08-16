import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   phoneNumber: { type: String },
   avatar: { type: String },
   isVerified: { type: Boolean, default: false },
   token: { type: String },
   lastLogin: { type: Date },
})

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next()
   this.password = await bcrypt.hash(this.password, 10)
   next()
})

const User = mongoose.model('User', userSchema)

export { User }
