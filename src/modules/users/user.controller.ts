// req r response manage kora controller er mul kaj

import { Request, Response } from 'express'
import User from './user.model'
import { userServices } from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const payLoad = req.body
    console.log(payLoad)

    const result = await userServices.createUser(payLoad)
    res.status(200).json({
      sucess: true,
      message: 'user created sucessfully',
      data: result,
    })
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: 'something went wrong',
      error: error,
    })
  }
}

//get user
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser()
    res.status(200).json({
      sucess: true,
      message: 'users getting sucessfully',
      result,
    })
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: 'something went wrong',
      error,
    })
  }
}

//get single USer
const getSingleUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {
    const result = await userServices.getSingleUser(userId)
    res.status(200).json({
      sucess: true,
      message: 'single users getting sucessfully',
      result,
    })
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: 'something went wrong',
      error,
    })
  }
}

//get update USer
const getUpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    console.log(userId)

    const payLoad = req.body

    const result = await userServices.getUpdateUser(userId, payLoad)
    res.status(200).json({
      sucess: true,
      message: 'users updated sucessfully',
      result,
    })
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: 'something went wrong',
      error,
    })
  }
}

//get single USer
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await userServices.deleteUser(userId)
    res.status(200).json({
      sucess: true,
      message: 'users deleted sucessfully',
      data: result,
    })
  } catch (error) {
    res.status(404).json({
      sucess: false,
      message: 'something went wrong',
      error,
    })
  }
}

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  getUpdateUser,
  deleteUser,
}
