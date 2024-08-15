import authRoutes from '../event/authRoutes.js'
import userRoutes from '../event/userRoutes.js'
import uploadAvatarRoute from '../event/uploadAvatarRouter.js'

export async function setupMiddlewares(app) {
   app.use('/api/auth', authRoutes)
   app.use('/api', userRoutes)
   app.use('/api', uploadAvatarRoute)
}
