import { NextFunction, Request, Response, Router } from 'express'
import { userController } from './user.controller'
import { userValidation } from './user.validation'
import auth from '../../middlewares/auth'

// router handle gulo sob ekhane hobe
const userRouter = Router()
userRouter.post(
  '/create-admin',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userValidation.userValidationSchema.parseAsync(req.body)
      next()
    } catch (error) {
      next(error)
    }
  },
  userController.createUser
)

userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.getUpdateUser)
userRouter.delete('/:userId', userController.deleteUser)



userRouter.get('/',auth("admin"), userController.getUser)

export default userRouter
