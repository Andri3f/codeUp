import express from 'express'
import { setupMiddlewares } from './src/middlewares/middleware.js'
import connectDB from './src/database/database.js'
import morgan from 'morgan'

async function createServer() {
   const app = express()
   app.use(morgan('dev'))
   app.use(express.json())
   await connectDB()
   await setupMiddlewares(app)

   app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000')
   })
}

createServer()
