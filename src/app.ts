import express, { Request, Response } from 'express'
import userRouter from './modules/users/user.router'
import tourRouter from './modules/tour/tour.router'
import bookingRouter from './modules/booking/booking.route'
import { globalErrorHandelar } from './middlewares/globalErrorHandelar'
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

app.use(globalErrorHandelar)
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  })
})
export default app
