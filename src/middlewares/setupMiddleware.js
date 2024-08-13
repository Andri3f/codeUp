import authRoutes from '../event/authRoutes.js'

export async function setupMiddlewares(app) {
   app.use('/api/auth', authRoutes)
}
