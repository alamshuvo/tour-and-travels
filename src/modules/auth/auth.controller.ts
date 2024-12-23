import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authService } from './auth.services'

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body)
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'user is registered successfully',
    data: result,
  })
})
const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body)
  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'user is registered successfully',
    token:result?.token,
    data: result.verifiedUser,
  })
})

export const AuthController = {
  register,
  login,
}
