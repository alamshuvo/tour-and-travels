import { NextFunction, Request, Response } from 'express'
import { tourServices } from './tour.services'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
const createTour = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const body = req.body
    const result = await tourServices.createTour(body)
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: 'user created sucessfully',
      data: result,
    })
  } catch (error) {
   next(error)
  }
}

const getTour = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const result = await tourServices.getTour()
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'get Tour sucessfully',
      data: result,
    })
  } catch (error) {
  next(error)
  }
}

const getSingleTour = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params
    const result = await tourServices.getSingleTour(id)
   sendResponse(res,{statusCode:StatusCodes.OK,message:'get Tour sucessfully',data:result})
  } catch (error) {
  next(error)
  }
}

const updateTour = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params
    const body = req.body
    const result = await tourServices.updateTour(
      id,
      body({
        new: true,
      })
    )
 sendResponse(res,{statusCode:StatusCodes.OK,message:'Tour update  sucessfully',data:result})
  } catch (error) {
   next(error)
  }
}

const deleteTour = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params
    const result = await tourServices.deleteTour(id)
   sendResponse(res,{statusCode:StatusCodes.OK,message:'Tour delete sucessfully',data:result})
  } catch (error) {
    next(error)
  }
}

const getNextSchedule = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params
    console.log(id)

    const result = await tourServices.getNextSchedule(id)
   sendResponse(res,{statusCode:StatusCodes.OK,message:'get next schedule sucessfully',data:result})
  } catch (error) {
    console.log(error);
 next(error)
  }
}

export const tourController = {
  createTour,
  getTour,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
