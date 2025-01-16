import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { userValidation } from '../users/user.validation'
import { AuthValidation } from './auth.validation'

const authRouter = Router()
authRouter.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  AuthController.register
)
authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
)
authRouter.post("/forget-password",validateRequest(AuthValidation.forgetPasswordValidationSchema),AuthController.forgetPassword);

authRouter.post("/reset-password",validateRequest(AuthValidation.resetPasswordValidationSchema),AuthController.resetPassword)

export default authRouter
