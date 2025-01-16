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

const forgetPassword = catchAsync(async(req,res)=>{
  
 const result = await authService.forgetPassword(req.body)
 sendResponse(res,{
  statusCode:StatusCodes.ACCEPTED,
  status:true,
  message:"Reset password link sent is email",
  data:null
 })
})

const resetPassword = catchAsync(async(req,res)=>{
 
 const result = authService.resetPassword(req.body)
 sendResponse(res,{
  statusCode:StatusCodes.ACCEPTED,
  status:true,
  message:"password reset sucessfully",
  data:result
 })
})
export const AuthController = {
  register,
  login,
  forgetPassword,
  resetPassword
}
