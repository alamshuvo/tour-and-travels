import config from '../../config'
import sendMail from '../../utils/sendMail'
import IUser from '../users/user.interface'
import User from '../users/user.model'
import { IForgetPassword, ILoginUser, IResetPassword } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const register = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select("+password")
 
  if (!user) {
    throw new Error('This user is not found')
  }
  const userStatus = user?.userStatus
  if (userStatus === 'inactive') {
    throw new Error('user is not active')
  }
  const isPassWordMatch = await bcrypt.compare(payload?.password, user.password)
  if (!isPassWordMatch) {
    throw new Error('password to vul dyeachen ')
  }
  const token = jwt.sign({ email: user?.email, role: user?.role }, 'secret', {
    expiresIn: '1d',
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const verifiedUser = {name:user.name
    ,
    email:user?.email,
    role:user?.role,

 }
  return {token,verifiedUser}
}

const forgetPassword = async (payload:IForgetPassword)=>{
 const user  = await User.findOne({email:payload?.email})

 
 if (!user) {
   throw new Error("User is not found !!!")
 }
 if (user.userStatus === "inactive") {
  throw new Error("You are not a valid user.")
 }
 const JwtPayload = {
 email:user?.email,
 role:user?.role
 }
 const token = jwt.sign(JwtPayload,"secreat",{expiresIn:"1h"})

 const resetLink = `http://localhost:5173/reset-password?id=${user?._id}&token=${token}`
 await sendMail(user?.email,"reset password",resetLink);

}

const resetPassword = async(payload:IResetPassword)=>{
  
  const user = await User.findById(payload?.id);

  
  if (!user) {
    throw new Error("user not found !")
  }
  if (user?.userStatus === "inactive") {
    throw new Error("user is blocked")
  }
  jwt.verify(payload?.token,"secreat",(err,decoded)=>{
    if (err) {
      throw new Error("you are not authorized ")
    }
  })

  //hashed password before updating
  payload.password = await bcrypt.hash(payload?.password,Number(config.bcrypt_salt_round));
  if (user) {
    user.password = payload.password;
  }

  const result = await User.findByIdAndUpdate(user?.id,user,{new:true})
  return result
}
export const authService = {
  register,
  login,
  forgetPassword,
  resetPassword
}
