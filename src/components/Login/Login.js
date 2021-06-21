import React from "react"
import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import CustomTextField from "../CustomTextField/CustomTextField"
import { connect } from "react-redux"
import { setUser } from "../../redux/authReducer"
import { loginSchema } from "../../schema/schema"
import { createUseStyles } from "react-jss"
import { page } from '../../globalStyles/globalStyles'
import axios from 'axios'
import {toast} from 'react-toastify'

const useStyles = createUseStyles({
  loginForm: {
    ...page
  }
})

const Login = ({ history, setUser, user}) => {
  const { loginForm } = useStyles()
  const login = (body) => {
    axios.post('/auth/login', body)
    .then(results => {
      toast.success('Login Successful')
      console.log(results.data)
      setUser(results.data)
      history.push("/swipingpage")
    }).catch(err => toast.error(err.response.data))
  }
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={({ email, password }) => {
        login({ email, password })
      }}
      validationSchema={loginSchema}
    >
      {(values, isSubmitting) => (
        <Form className={loginForm}>
          <CustomTextField name="email" placeholder="email *" />
          <CustomTextField
            type="password"
            name="password"
            placeholder="password *"
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  )
}

const mapDispatchToProps = {
  setUser
}

export default connect(null, mapDispatchToProps)(Login)
