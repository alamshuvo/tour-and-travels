import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookingServices } from './booking.services'

const createBooking = catchAsync(async (req, res) => {
  const body = req.body
  const result = await bookingServices.createBooking(body)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'booking created sucessfully',
    data: result,
  })
})

export const bookingController = {
  createBooking,
}
