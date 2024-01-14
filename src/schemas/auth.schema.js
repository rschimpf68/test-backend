import { z } from "zod";

export const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6),
})

export const registerSchema = z.object({
   "username":
      z.string({
         required_error: "Username is required"
      }),
   "email":
      z.string({
         required_error: "Email is required"
      }).email({
         message: "Invalid email"
      }),
   "password":
      z.string({
         required_error: "Password is required"
      }).min(6, {
         message: "Password length has to be greater than 6 characters"
      })
});