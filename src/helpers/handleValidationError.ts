import { Response } from 'express'

export const handleValidationError = (error: any, res: Response) => {
  const issues = Object.values(error.errors).map((item: any) => {
    return {
      path: item.path,
      message: item.message,
    }
  })
  res.status(400).json({
    success: false,
    message: error.message,
    issues: issues,
    error: error,
  })
}
