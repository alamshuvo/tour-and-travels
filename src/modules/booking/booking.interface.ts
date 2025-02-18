import mongoose from 'mongoose'

export interface IBooking {
  user: mongoose.Schema.Types.ObjectId
  tour: mongoose.Schema.Types.ObjectId
  bookingSlots: number
  bookingStatus: 'pending' | 'paid' | 'cancelled'
  totalPrice: number
}
