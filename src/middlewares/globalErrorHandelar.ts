import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const globalErrorHandelar = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      sucess: false,
      message: err.message,
      error: err,
    })
    next()
  }