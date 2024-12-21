import mongoose from 'mongoose'
import Tour from '../tour/tour.model'
import { IBooking } from './booking.interface'
import bookingModel from './booking.model'

const createBooking = async (payload: IBooking): Promise<IBooking> => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { user, tour, bookingSlots } = payload
    const requiredTour = await Tour.findById(tour)

    if (!requiredTour) {
      throw new Error('Tour not found')
    }

    const totalPrice = requiredTour.price * bookingSlots

    payload.totalPrice = totalPrice
    payload.bookingStatus = 'pending'

    // availableSeats = 2
    // bookedSlots =3
    if (requiredTour.avaliableSeats < bookingSlots) {
      throw new Error('Seats not available')
    }
    const booking = await bookingModel.create([payload],{session:session})
   
    // avaliable seat tkhe book slot ta minue korte hobe

    const updatedTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      { $inc: { avaliableSeats: -bookingSlots } },
      { new: true }
    )
    if (!updatedTour) {
      throw new Error('Tour updated failed')
    }

    await session.commitTransaction()
    await session.endSession()
    return booking[0]
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

export const bookingServices = {
  createBooking,
}
