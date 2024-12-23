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
    .positive()
    .optional(),
  email: z
    .string({
      required_error: 'email must be provided and must be a string',
    })
    .email(),
  password: z.string({
    required_error: 'password must be provided and must be a string',
  }),
  photo: z.string().optional(),
})

export const userValidation = {
  userValidationSchema,
}
