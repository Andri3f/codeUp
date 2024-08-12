import mongoose from 'mongoose'

const loginUserSchema = new mongoose.Schema(
   {
      email: { type: String, required: true, unique: true },
      token: { type: String, required: true },
   },
   { timestamps: true },
)

const LoginUser = mongoose.model('LoginUser', loginUserSchema)

export default LoginUser
