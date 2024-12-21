import { z } from 'zod'

const userValidationSchema = z.object({
  name: z
    .string({
      required_error: 'name must be provided and must be a string',
    })
    .min(3)
    .max(50),
  age: z
    .number({
      required_error: 'age must be provided and must be a number',
    })
    .int()
    .positive(),
  email: z
    .string({
      required_error: 'email must be provided and must be a string',
    })
    .email(),
  photo: z.string().optional(),
})

export const userValidation = {
  userValidationSchema,
}
