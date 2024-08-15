import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
   name: { type: String, required: true, minlength: 3 },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true, minlength: 6 },
   phoneNumber: { type: String, default: '' },
   avatar: { type: String, default: '' },
   token: { type: String },
   lastLogin: { type: Date },
})

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next()
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
   next()
})

const User = mongoose.model('User', userSchema)

export { User }
