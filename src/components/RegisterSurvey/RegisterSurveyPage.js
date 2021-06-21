import React from "react"
import { Formik, Form } from "formik"
import Button from "@material-ui/core/Button"
import CustomTextField from "../CustomTextField/CustomTextField"
import registerSchema from "../../schema/schema"
import { connect } from "react-redux"
import { setUser } from "../../redux/authReducer"
import { createUseStyles } from "react-jss"
import { page } from '../../globalStyles/globalStyles'
import axios from "axios"
import { toast } from "react-toastify"

const useStyles = createUseStyles({
  registerForm: {
    ...page
  },
  formSection: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  "@media (max-width: 850px)": {
    registerForm: {
      minHeight: "80vh"
    },
    formSection: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      flexFlow: "column",
      justifyContent: "space-between"
    }
  }
})


const RegisterSurveyPage = ( {history, setUser} ) => {
  const {registerForm} = useStyles()

  const finishRegister = body => {
    axios.put('/auth/finishregister', body)
    .then(results=> {
      toast.success('Account Creation completed!')
      setUser(results.data)
      history.push('/swipingpage')
    })
    .catch(err=> toast.error(err.response.data))
  }
  return (
   <Formik
        initialValues={{
            first: '',
            last: '',
            age: '',
            gender: '',
            rel_type: '',
            sexual_or: ''
        }}
        onSubmit={( {first, last, age, gender, rel_type, sexual_or} )=> {
            finishRegister({ first, last, age, gender, rel_type, sexual_or })
        }}>

      {(values, isSubmitting) => (
        <Form className={registerForm}>


          {/* <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="secondary"
          > */}
          <a href='https://video.search.yahoo.com/search/video?fr=mcafee&ei=UTF-8&p=never+gonna+give+you+up&type=E211US1485G0#id=0&vid=75170fc230cd88f32e475ff4087f81d9&action=click'>Submit</a>
          {/* </Button> */}
        </Form>
      )}
    </Formik>
  )
}

const mapDispatchToProps = {
  setUser
}

export default connect(null, mapDispatchToProps)(RegisterSurveyPage)

//test