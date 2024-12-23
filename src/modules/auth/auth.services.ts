import IUser from '../users/user.interface'
import User from '../users/user.model'
import { ILoginUser } from './auth.interface'
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

export const authService = {
  register,
  login,
}
