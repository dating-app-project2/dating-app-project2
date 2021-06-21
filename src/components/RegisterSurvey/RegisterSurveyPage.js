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
import Slider from '@material-ui/core/Slider';

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
  const {registerForm, formSection} = useStyles()

  const finishRegister = body => {
    axios.put('/auth/finishregister', body)
    .then(results=> {
      toast.success('Account Creation completed!')
      setUser(results.data)
      history.push('/swipingpage')
    })
    .catch(err=> toast.error(err.response.data))
  }
  function valuetext(value) {
  return `Age: ${value}`;
}
const marks = [
  {
    value: 18,
    label: '18',
  },
  
  {
    value: 30,
    label: '30',
  },
  {
    value: 50,
    label: '50',
  },
  {
    value: 70,
    label: '70',
  },
  {
    value: 90,
    label: '90',
  },
];
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
          <div className={formSection}>
            <CustomTextField
              name="first"
              placeholder="First Name"
            />
            <CustomTextField
              name="last"
              placeholder="Last Name"
            />
          </div>
           <h2>Age</h2>
          <div className={formSection}>
           
            <Slider
              defaultValue={18}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-custom"
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </div>
          <div className={formSection}>
            <CustomTextField
              name="gender"
              placeholder="Gender"
            />
            <CustomTextField
              name="rel_type"
              placeholder="Relationship Type"
            />
          </div>
          <div className={formSection}>
            <CustomTextField
              name="sexual_or"
              placeholder="Sexual Orientation"
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="secondary"
         />
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