import express from 'express'
import { setupMiddlewares } from './src/middlewares/middleware.js'
import connectDB from './src/database/database.js'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
async function createServer() {
   const app = express()
   app.use(
      cors({
         exposedHeaders: ['Authorization'],
      }),
   )
   app.use(morgan('dev'))
   app.use(express.json())

   await connectDB()
   await setupMiddlewares(app)
   app.use('/uploads', express.static('uploads'))
   app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000')
   })
}

createServer()
