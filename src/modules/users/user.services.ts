import IUser from './user.interface'
import User from './user.model'

const createUser = async (payLoad: IUser): Promise<IUser> => {
  payLoad.role="admin"
  const result = await User.create(payLoad)
  return result
}

const getUser = async () => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string) => {
  const result = await User.findById(id)
  return result
}
const getUpdateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  })

  return result
}
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const userServices = {
  createUser,
  getUser,
  getSingleUser,
  getUpdateUser,
  deleteUser,
}
