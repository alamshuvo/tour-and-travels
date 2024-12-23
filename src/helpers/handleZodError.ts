import { Response } from 'express'

export const handleZodError = (err: any, res: Response) => {
  const issues = err.issues.map((item: any) => {
    return {
      path: item.path.join('.'),
      message: item.message,
    }
  })
  res.status(400).json({
    success: false,
    message: 'Validation Error',
    errors: issues,
  })
}