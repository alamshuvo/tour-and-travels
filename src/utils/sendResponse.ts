import { Response } from 'express'

type TSucessResponse<T> = {
  status?: boolean
  statusCode: number
  message: string
  token?:string
  data: T | T[] | null
}

const sendResponse = <T>(res: Response, data: TSucessResponse<T>) => {
  res.status(data.statusCode).send({
    sucess: true,
    statusCode: data.statusCode,
    message: data.message,
    token:data.token,
    data: data.data,
  })
}

export default sendResponse
