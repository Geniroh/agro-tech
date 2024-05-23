import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3, {
        message: "password is required"
    })
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "password must contain at least 6 character(s)"
    }),
})




export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "password must contain at least 6 character(s)"
    }),
    name: z.string().min(1, {
        message: "fullname is required"
    }),
    // phone: z.string().min(10, {
    //     message: "Enter a valid phone number"
    // }),
    // occupation: z.string(),
    // country: z.string()
})