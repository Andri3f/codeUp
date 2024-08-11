import mongoose from 'mongoose'
const dbURL =
   'mongodb+srv://vvvmikhnov:PuAlyEE2cDN0zvW2@cluster0.xpwkjgu.mongodb.net/codeUp?retryWrites=true&w=majority&appName=Cluster0s'

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
