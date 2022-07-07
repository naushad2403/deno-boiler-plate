
import {yup} from "../../dependency.ts"
export const signupValidation = yup.object({
        name: yup
            .string()
            .min(1)
            .max(20)
            .trim()
            .required(`Name is a required field`),
        email: yup
            .string()
            .email()
            .nullable()
            .trim()
            .required(`Email is a required field`),
        password: yup
            .string()
            .trim()
            .nullable()
            .required(`Password is a required field`)
    })