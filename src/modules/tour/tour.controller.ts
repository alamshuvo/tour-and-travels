import { tourServices } from './tour.services'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { sendImageCloudinary } from '../../utils/fileUploadHelpers'

const createTour = catchAsync(async (req, res) => {
  const body = JSON.parse(req.body.data)
  console.log(req.file);
  
  if (req.file) {
    const imageName = "random";
    const path = req.file.path;
   const {secure_url} = await  sendImageCloudinary(imageName,path)
   body.coverImage = secure_url
   console.log(body);
  }
 
 
  
  const result = await tourServices.createTour(body)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'tour created sucessfully',
    data: result,
  })
})

const getTour = catchAsync(async (req, res) => {
  console.log(req.query)

  const result = await tourServices.getTour(req.query)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'get Tour sucessfully',
    data: result,
  })
})
const getSingleTour = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await tourServices.getSingleTour(id)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'get Tour sucessfully',
    data: result,
  })
})

const updateTour = catchAsync(async (req, res) => {
  const { id } = req.params
  const body = req.body
  const result = await tourServices.updateTour(
    id,
    body({
      new: true,
    })
  )
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour update  sucessfully',
    data: result,
  })
})
const deleteTour = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await tourServices.deleteTour(id)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Tour delete sucessfully',
    data: result,
  })
})

const getNextSchedule = catchAsync(async (req, res) => {
  const { id } = req.params
  console.log(id)

  const result = await tourServices.getNextSchedule(id)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'get next schedule sucessfully',
    data: result,
  })
})
export const tourController = {
  createTour,
  getTour,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
