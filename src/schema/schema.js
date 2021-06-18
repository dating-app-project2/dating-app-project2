import * as yup from 'yup'

export const loginSchema = yup.object({
    email: yup.string().required().max(200),
    password: yup.string().required().min(10).max(30)
})

const registerSchema = yup.object({
    email: yup.string().required().max(200),
    password: yup.string().required().min(10).max(30)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})/,
  "Must contain Uppercase, Lowercase, Number, Special Character"),
  confirm: yup.string().required().min(10).max(30)
  .oneOf([yup.ref('password'), 'Passwords must match'])
})

export default registerSchema