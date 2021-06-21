import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../redux/authReducer'
import {createUseStyles} from 'react-jss'
import axios from 'axios'
import {variables} from '../globalStyles/globalStyles'
import {AiOutlineLogout} from 'react-icons/ai'
import {FcAbout} from 'react-icons/fc'
import {IoMdChatboxes} from 'react-icons/io'
import {AiFillHome} from 'react-icons/ai'

const {primary, secondary, sand, red} = variables
const useStyles = createUseStyles({
    header: {
      backgroundColor: primary,
      display: 'flex',
      width: '100%',
      height: '10vh',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nav: {
      display: 'flex',
      width: '50%',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    icons:{
      color: sand,
      height: '100px',
      width: '100px',
        "&hover":{
          color: secondary
        }
    },
    questionIcon:{
      color: red,
      borderRadius: '50%',
        "&hover":{
          backgroundColor: secondary
        }
    },
    chatIcon:{
      color: red,
        "&hover":{
          backgroundColor: secondary
        }
    },
    homeIcon:{
      color: red,
        "&hover":{
          backgroundColor: secondary
        }
    }
})

const Header = ({user, setUser, history, location}) => {
    const {header, nav, icons, questionIcon, chatIcon, homeIcon} = useStyles()
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
          <AiFillHome
            className={homeIcon}
            size={50}
            onClick={() => history.push("/swipingpage")}
          />
          <IoMdChatboxes
            className={chatIcon}
            size={50}
            onClick={() => history.push("/chat")}
          />
          <FcAbout
            className={questionIcon}
            size={50}
            onClick={() => history.push("/about")}
          />
         
          <AiOutlineLogout
            className={icons}
            size={50}
            onClick={() => {
              logout()
              history.push("/login")
            }}
          />
        </nav>
      ) : (
        <nav className={nav}>
          <FcAbout
            className={questionIcon}
            size={50}
            onClick={() => history.push("/about")}
          />
         {/* <PovLogo
          className={icons}
          size={50}
          id= 'ai'
          onClick={() => history.push("/swipingpage")}/> */}

          {location.pathname === "/login" ? (
            <button
              color="primary"
              onClick={() => history.push("/register")}
            >
              Register
            </button>
          ) : (
            <button
              color="primary"
              onClick={() => history.push("/login")}
            >
              Login
            </button>
          )}
        </nav>
      )}
    </header>
  )
}

const mapStateToProps = state => {
    const {user} = state.auth
    return {user}
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))


// import React from 'react'
// import {createUseStyles} from 'react-jss'
// import PersonIcon from '@material-ui/icons/Person';
// import { IconButton } from '@material-ui/core';
// import ForumIcon from '@material-ui/icons/Forum';


// const useStyles = createUseStyles({
//   header:{
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     zIndex: '100',
//     borderBottom: '1px solid #f9f9f9'
//   },
//   headerIcon: {
//     padding: '20px'
//   },
//   headerLogo: {
//     objectFit: "contain",
//     height: '40px'
//   }
// })

// function Header(){
//     const {headerIcon, headerLogo, header} = useStyles
//   return (
//     <div className={header}>
//       <h1>Tinder clone!</h1>
//       <IconButton>
//           <PersonIcon fontSize="large" className={headerIcon}/>
//       </IconButton>
//       <img 
//         className={headerLogo}
//         src='https://toppng.com/uploads/preview/tinder-logo-11545685525kmredhqlma.png'
//         alt="Tinder Logo"/>
//       {/* Header
//       Tinder cards
//       swipe buttons */}
//       <IconButton>
//         <ForumIcon fontSize='large' className={headerIcon}/>
//       </IconButton>
//     </div>
//   );

// }

// export default Header