import express, { Request, Response } from 'express'
import userRouter from './modules/users/user.router'
const app = express()
//middleware
app.use(express.json())
app.use('/api/user', userRouter)

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
export default app
