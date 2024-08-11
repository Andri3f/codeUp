import express from 'express'
import connectDB from '../database/database.js'
import serveIndexHtml from './middlewares/middleware.js'

const app = express()

connectDB()

serveIndexHtml(app)

const PORT = 3000

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT} - codeUp`)
})
