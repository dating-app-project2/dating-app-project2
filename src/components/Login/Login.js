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
    // backgroundColor: 'green',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '400px',
    height: '300px',
  },
  imageAndRegister: {
    backgroundColor: '#3bb3d1',
    height: '700px',
    width: '95vw',
    display: 'flex',
    alignItems: 'center',
  },
  mainImage: {
    height: '700px',
    width: '70vw',
    display: 'flex',
    alignItems: 'center'
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
  makeTheFirst: {
    // backgroundColor: 'salmon',
    color: '#A01A58',
    display: 'flex',
    fontSize: '60px'
  },
  buttonAbout: {
    // backgroundColor: 'salmon',
    width: '80px',
    position: 'absolute',
    top: 30,
    right: 240,
    zIndex: "101",
  },
  button: {
    // backgroundColor: 'salmon',
    width: '80px',
    position: 'absolute',
    top: 30,
    right: 350,
    zIndex: "101",
  },
  signUpText: {
    // backgroundColor: 'salmon',
    marginLeft: '15px'
  },
  pass1: {
    // backgroundColor: 'teal',
    marginLeft: '20px'
  },
  pass2: {
    // backgroundColor: 'teal',
    marginLeft: '20px',
    marginTop: '20px'
  },
  buttonLogin: {
    backgroundColor: 'salmon',
    marginLeft: '150px',
    marginTop: '10px',
  },
  logoDream: {
    // backgroundColor: 'salmon',
    position: 'absolute',
    width: '300px',
    top: 8,
    left: 30
  },
  heartLogo: {
    // backgroundColor: 'salmon',
    position: 'absolute',
    width: '100px',
    top: 690,
    right: 35
  },
})

const Login = ({ history, setUser, password}) => {
  const { loginForm, imageAndRegister, mainImage, lifeShort, makeTheFirst, buttonAbout, button, signUpText, pass1, pass2, buttonLogin, heartLogo, logoDream } = useStyles()
  const login = (body) => {
    axios.post('/auth/login', body)
    .then(results => {
      toast.success('Login Successful')
      if(password  === 'adminLogin123!'){
        toast.success('Welcome creator!')
      }
      console.log(results.data)
      setUser(results.data)
     history.push('/swipingPage')
    }).catch(err => toast.error(err))
  }
  return (
    <div>
      <img 
               className={heartLogo}
               src='https://i.ibb.co/6R4hC77/newlogo.png'
               alt="Tinder Logo"
              //  onClick={() => history.push("/swipingpage")}
            />
                    <img 
               className={logoDream}
               src='https://www.dreamscometrue.org/wp-content/themes/bootrapwp-3d/images/dct-logo-horizontal.png'
               alt="Tinder Logo"
              //  onClick={() => history.push("/swipingpage")}
            />


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
                onClick={() => history.push("/register")}
                type="submit" 
                variant="contained"
                color="primary"
                style={{fontWeight: '700'}}
                >
                Register
              </Button>
            </div>
    <div className={imageAndRegister}>
    <div
      className={mainImage} 
      style={{background: `url(https://images.unsplash.com/photo-1485031828708-859c036d5a5a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`,
      backgroundSize: 'cover',
      backgroundPositionX: '50%',
      backgroundPositionY: '100%',
      borderRight: '5px solid white'
      }}>

        <h1 className={lifeShort}>WELCOME BACK, <br/><span className={makeTheFirst}>MAKE YOUR DREAMS COME TRUE</span></h1>

      </div>
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
      
         <h1 className={signUpText}>Sign In</h1>
         <div className={pass1}>

          <CustomTextField name="email" placeholder="email *" />
          </div>
          <div className={pass2}>

          <CustomTextField
            type="password"
            name="password"
            placeholder="password *"
            />
            </div>
          <div className={buttonLogin}>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
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

export default connect(null, mapDispatchToProps)(Login)
