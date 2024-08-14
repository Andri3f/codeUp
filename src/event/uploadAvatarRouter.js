import express from 'express'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
   },
})

const upload = multer({ storage: storage })

const router = express.Router()

router.post('/upload-avatar', upload.single('avatar'), (req, res) => {
   console.log('Upload avatar route hit')
   console.log('Request file:', req.file)
   if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' })
   }
   const normalizedPath = req.file.path.replace(/\\/g, '/')
   res.status(200).send({ message: 'File uploaded successfully', filePath: normalizedPath })
})

router.use((err, req, res, next) => {
   console.error(err.stack)
   res.status(500).send({ message: 'Something went wrong!', error: err.message })
})

export default router
