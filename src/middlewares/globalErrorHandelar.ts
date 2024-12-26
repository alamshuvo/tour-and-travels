import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import { handleGenericError } from '../helpers/handleGenerricError'
import { handleDuplicateError } from '../helpers/handleDuplicateError'
import { handleCastError } from '../helpers/handleCustError'
import { handleValidationError } from '../helpers/handleValidationError'
import { handleZodError } from '../helpers/handleZodError'

//Generic Error
//Duplicate Error
// Validation Error
// cast Error g
// zod Error

type TErrorResponse = {
  success: boolean
  message: string
  error: any
  name?: string
  code?: number
}
export const globalErrorHandelar = (
  err: TErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //cast error
  if (err.name && err.name === 'zodError') {
    handleZodError(err, res)
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res)
  }

  //validation Erroro
  else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res)
  }

  // duplicate key error
  else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res)
  }

  // js generic error parent error
  else if (err instanceof Error) {
    handleGenericError(err, res)
  }

  next()
}
