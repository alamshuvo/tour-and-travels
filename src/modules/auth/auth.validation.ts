import { z } from 'zod'

const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  password: z.string({ required_error: 'password must be nedded' }),
})

const forgetPasswordValidationSchema =z.object({
  email:z.string({required_error:"Email is required"}).email(),

})
const resetPasswordValidationSchema = z.object({
  id:z.string({required_error:"id must be needed"}),
  token:z.string({required_error:"token dyeachilam fele dyeacho?"}),
  password:z.string({required_error:"password k dibe update ki korbo?"})
})
export const AuthValidation = {
  loginValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema
}
