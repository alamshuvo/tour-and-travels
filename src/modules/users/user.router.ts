import { Router } from 'express'
import { userController } from './user.controller'

// router handle gulo sob ekhane hobe
const userRouter = Router()
userRouter.post('/create-user', userController.createUser)

userRouter.get('/:userId', userController.getSingleUser)
userRouter.put('/:userId', userController.getUpdateUser)
userRouter.delete('/:userId', userController.deleteUser)
userRouter.get('/', userController.getUser)

export default userRouter
