// req r response manage kora controller er mul kaj

import { NextFunction, Request, Response } from 'express'
import { userServices } from './user.services'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payLoad = req.body
    console.log(payLoad)

    const result = await userServices.createUser(payLoad)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'user created sucessfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

//get user
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.getUser()
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'user get sucessfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

//get single USer
const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId
  try {
    const result = await userServices.getSingleUser(userId)
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'single user get sucessfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

//get update USer
const getUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId
    console.log(userId)

    const payLoad = req.body

    const result = await userServices.getUpdateUser(userId, payLoad)
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'user updated sucessfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

//get single USer
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId
    const result = await userServices.deleteUser(userId)
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'user delete sucessfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  getUpdateUser,
  deleteUser,
}
