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

export const finishRegisterSchema = yup.object({
  first: yup.string().required().min(2).max(30),
  last: yup.string().required().min(2).max(100),
  age: yup.number().required(),
  gender: yup.string().required().min(3),
  rel_type: yup.string().required().min(3).max(30),
  sexual_or: yup.string().required().min(3).max(30)
})

export default registerSchema