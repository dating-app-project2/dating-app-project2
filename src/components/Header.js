import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../redux/authReducer'
import {createUseStyles} from 'react-jss'
import axios from 'axios'
import {variables} from '../globalStyles/globalStyles'
import {AiOutlineLogout} from 'react-icons/ai'
import {FcAbout} from 'react-icons/fc'
import {IconButton} from '@material-ui/core'
import ForumIcon from '@material-ui/icons/Forum'
import PersonIcon from '@material-ui/icons/Person'
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const {primary, secondary, sand, red} = variables
const useStyles = createUseStyles({
  header:{
    backgroundColor: 'transparent',
    display: 'flex',
    width: '100%',
    height: '10vh',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100',
    // borderBottom: '1px solid #f9f9f9'
  },
  headerIcon: {
    padding: '20px'
  },
  headerLogo: {
    objectFit: "contain",
    height: '10vh',
    backgroundColor: 'primary'
  },
   icons:{
      color: sand,
      height: '100px',
      width: '100px',
        "&hover":{
          color: secondary
        }
    },
    nav: {
      display: 'flex',
      width: '50%',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    headerIcon: {
    padding: '20px',
    color: red,
        "&hover":{
          backgroundColor: secondary
        }
    },
    headerLogo: {
      objectFit: "contain",
      height: '40px'
    },
    signInBtn: {
      display: 'none'
    },
    signInBtn: {
      display: 'none'
    },
    questionIcon: {
      display: 'none'
    },
})

const Header = ({user, setUser, history, location}) => {
    const {header, nav, icons, questionIcon, headerIcon, headerLogo, signInBtn} = useStyles()
    const logout = () => {
        axios.post('/auth/logout')
        .then(()=> 
        setUser({
            id: '',
            email: '',
            phone_area: '',
            phone_num1: '',
            phone_num2: '',
            first: '',
            last: '',
            age: '',
            gender: '',
            rel_type: '',
            sexual_or: ''
        }))
        .catch(err=>console.log(err))
    }
    return(
     <header className={header}>
      {location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      user &&
      user.id ? (
          <nav className={nav}>
          <IconButton>
            <PersonIcon 
            fontSize="large" 
            className={headerIcon}
            onClick={()=> history.push('/profile')}
            />
          </IconButton>
          <IconButton>
            <ForumIcon 
              fontSize='large' 
              className={headerIcon}
              onClick={() => history.push("/matches")}
            />
          </IconButton>
          <IconButton>
            <img 
               className={headerLogo}
               src='https://i.ibb.co/6R4hC77/newlogo.png'
               alt="Tinder Logo"
               onClick={() => history.push("/swipingpage")}
            />
          </IconButton>
          <IconButton>
          <InfoIcon
            fontSize="large"
            className={questionIcon}
            size={50}
            onClick={() => history.push("/about")}
          />
          </IconButton>
         <IconButton>
          <ExitToAppIcon
            fontSize="large"
            className={icons}
            size={20}
            onClick={() => {
              logout()
              history.push("/login")
            }}
          />
          </IconButton>
          </nav>
      ) : (
        <nav className={nav}>
          <FcAbout
            className={questionIcon}
            size={50}
            onClick={() => history.push("/about")}
          />
          {location.pathname === "/login" ? (
            <button
              color="primary"
              onClick={() => history.push("/register")}
              className={signInBtn}
            >
              Register
            </button>
          ) : (
            <button
              color="primary"
              onClick={() => history.push("/login")}
              className={signInBtn}
            >
              Sign In
            </button>
          )}
        </nav>
      )}
    </header>
  )}

const mapStateToProps = state => {
    const {user} = state.auth
    return {user}
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))