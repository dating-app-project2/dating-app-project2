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
    // backgroundColor: 'green',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '400px',
    height: '300px',
  },
  formSection: {
    // backgroundColor: 'green',
    width: "95%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft:'10px'
  },
  imageAndRegister: {
    backgroundColor: '#3bb3d1',
    height: '700px',
    width: '95vw',
    display: 'flex',
    alignItems: 'center',
    // boxShadow: '1px 1px 50px black'
  },
  mainImage: {
    // backgroundColor: 'teal',
    height: '700px',
    width: '70vw',
    display: 'flex',
    alignItems: 'center'
  },
  pass1: {
    // backgroundColor: 'teal',
    marginLeft: '5px'
  },
  pass2: {
    // backgroundColor: 'salmon',
    marginLeft: '15px'
  },
  todayText: {
    // backgroundColor: 'salmon',
    // display: 'flex',
    // fontSize: '45px'
    // marginLeft: '15px'
  },
  signUpText: {
    // backgroundColor: 'salmon',
    marginLeft: '15px'
  },
  button: {
    // backgroundColor: 'salmon',
    width: '80px',
    position: 'absolute',
    top: 30,
    right: 350,
    zIndex: "101",
  },
  buttonAbout: {
    // backgroundColor: 'salmon',
    width: '80px',
    position: 'absolute',
    top: 30,
    right: 250,
    zIndex: "101",
  },
  buttonLogin: {
    // backgroundColor: 'salmon',
    // marginLeft: '125px',
  },
  buttons: {
    // backgroundColor: 'salmon',
    width: '80%',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginLeft: '10%'
  },
  makeTheFirst: {
    // backgroundColor: 'salmon',
    color: '#A01A58',
    display: 'flex',
    fontSize: '60px'
  },
  lifeShort: {
    // backgroundColor: 'salmon',
    color: 'black',
    textAlign: 'left',
    fontSize: '80px',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 120,
    fontWeight:'800',
    marginLeft: '25px',
    textShadow: '3px 3px 5px rgba(250, 250, 250, 0.4)' 
  },

})



const Register = ({ history, setUser }) => {
  const { registerForm, formSection, imageAndRegister, mainImage, pass1, pass2, todayText, signUpText, button, buttonLogin, buttons, buttonAbout, makeTheFirst, lifeShort } = useStyles()
  const register = body => {
    axios
      .post("/auth/register", body)
      .then(results => {
        toast.success("Register successful")
        setUser(results.data)
        history.push("/registerSurveyPage")
      })
      .catch(err => toast.error(err.response.data))
  }
  return (
    <div>
                  <div className={buttonAbout}>
              <Button
                onClick={() => history.push("/about")}
                type="submit"
                // variant="contained"
                // color="white"
                style={{color: 'white', fontWeight: '700'}}
                >
                About
              </Button>
            </div>
                  <div className={button}>
              <Button
                onClick={() => history.push("/login")}
                type="submit" 
                variant="contained"
                color="primary"
                style={{fontWeight: '700'}}
                >
                Login
              </Button>
            </div>
    <div className={imageAndRegister}>
      

      <div
      className={mainImage} 
      style={{background: `url(https://images.unsplash.com/photo-1521153898610-138d1ce70bcb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80`,
      backgroundSize: 'cover',
      backgroundPositionX: '50%',
      backgroundPositionY: '100%',
      borderRight: '5px solid white'
      }}>

        <h1 className={lifeShort}>LIFE'S SHORT, <br/><span className={makeTheFirst}>MAKE THE FIRST MOVE</span></h1>
      </div>

    
   <Formik
        initialValues={{
          email: '',
          password: '',
          confirm: ''
        }}
        onSubmit={( {email, password} )=> {
            register({email, password})
        }}

        validationSchema={registerSchema}
        >

            {(values, isSubmitting)=> (
              <Form className={registerForm}>
                <h1 className={signUpText}>Sign Up Today</h1>
          <div className={formSection}>
            <div className={pass1}>
              <CustomTextField name="email" placeholder="enter email *" />
            </div>
          </div>
          <div className={formSection}>
            <div className={pass1}>
              <CustomTextField
                type="password"
                name="password"
                placeholder="password *"
                />
            </div>
            <div className={pass2}>
              <CustomTextField
                type="password"
                name="confirm"
                placeholder="confirm password *"
                />
            </div>
          </div>
          <div className={buttons}>
            <div className={buttonLogin}>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="secondary"
                style={{fontWeight: '700'}}
                >
                Register
              </Button>
            </div>

          </div>
        </Form>
      )}
      
</Formik>
</div>
</div>
  )
}

const mapDispatchToProps = {
  setUser
}

export default connect(null, mapDispatchToProps)(Register)