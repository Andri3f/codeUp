import { createServer as createViteServer } from 'vite'
import { errorHandler } from '../error/errorHandler.js'
import userRoutes from '../event/userRoutes.js'
import uploadAvatarRoute from '../event/uploadAvatarRouter.js'
import avatarRoutes from '../event/uploadAvatarRouter.js'

export async function setupMiddlewares(app) {
   const vite = await createViteServer({
      server: { middlewareMode: true },
   })

   app.use('/api', userRoutes)
   app.use('/api', uploadAvatarRoute)
   app.use('/api', avatarRoutes)

   app.use(vite.middlewares)

   app.use('*', async (req, res) => {
      const url = req.originalUrl
      try {
         let template = await vite.transformIndexHtml(
            url,
            `<!DOCTYPE html><html><head><title>Vue App</title></head><body><div id="app"></div></body></html>`,
         )
         res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
      } catch (e) {
         vite.ssrFixStacktrace(e)
         console.error(e)
         res.status(500).end(e.message)
      }
   })
   app.use(errorHandler)
}
