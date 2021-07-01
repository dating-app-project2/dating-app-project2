import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().required().max(200),
    password: yup.string().required().min(10).max(30)
});

const registerSchema = yup.object({
    email: yup.string('Enter your email').required('Email required').max(200),
    password: yup.string('Enter password').required('Password required').min(10).max(30)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})/,
  "Must contain Uppercase, Lowercase, Number, Special Character"),
  confirm: yup.string().required().min(10).max(30)
  .oneOf([yup.ref('password'), 'Passwords must match'])
});

export const finishRegisterSchema = yup.object({
  first: yup.string().required('First required').min(2).max(30),
  last: yup.string().required('Last required').min(2).max(100),
  age: yup.number().required('Age required').min(18, "Min age is 18").label("Age"),
  bio: yup.string().required().max(500),
  gender: yup.string().required('gender required').min(3),
  rel_type: yup.string().required('Relationship type required').min(3).max(30),
  sexual_or: yup.string().required('Sexual orientation required').min(3).max(30)
});

export default registerSchema;