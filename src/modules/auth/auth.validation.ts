import { z } from 'zod'

const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  password: z.string({ required_error: 'password must be nedded' }),
})

export const AuthValidation = {
  loginValidationSchema,
}
