import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const dbURL = process.env.MONGO_URI

const connectDB = async () => {
   try {
      await mongoose.connect(dbURL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log('MongoDB connected')
   } catch (err) {
      console.log('Bad connect to MongoDB', err)
      process.exit(1)
   }
}

export default connectDB
