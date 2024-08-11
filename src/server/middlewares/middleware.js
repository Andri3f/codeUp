import { join } from 'path'

const serveIndexHtml = (app) => {
   app.get('*', (req, res) => {
      res.sendFile(join(process.cwd(), 'index.html'))
   })
}

export default serveIndexHtml
