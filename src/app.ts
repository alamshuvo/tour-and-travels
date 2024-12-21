import express, { NextFunction, Request, Response } from 'express'
import userRouter from './modules/users/user.router'
import tourRouter from './modules/tour/tour.router'
import { StatusCodes } from 'http-status-codes'
import bookingRouter from './modules/booking/booking.route'
const app = express()
//middleware
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/tour', tourRouter)
app.use('/api/booking', bookingRouter)

app.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).json({
      sucess: true,
      message: 'get Data sucessfully',
    })
  } catch (error) {
    console.log(error)
  }
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    sucess: false,
    message: err.message,
    error: err,
  })
  next()
})
export default app
