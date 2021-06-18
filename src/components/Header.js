import React from 'react'
import {createUseStyles} from 'react-jss'
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';


const useStyles = createUseStyles({
  header:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: '100',
    borderBottom: '1px solid #f9f9f9'
  },
  headerIcon: {
    padding: '20px'
  },
  headerLogo: {
    objectFit: "contain",
    height: '40px'
  }
})

function Header(){
    const {headerIcon, headerLogo, header} = useStyles
  return (
    <div className={header}>
      <h1>Tinder clone!</h1>
      <IconButton>
          <PersonIcon fontSize="large" className={headerIcon}/>
      </IconButton>
      <img 
        className={headerLogo}
        src='https://toppng.com/uploads/preview/tinder-logo-11545685525kmredhqlma.png'
        alt="Tinder Logo"/>
      {/* Header
      Tinder cards
      swipe buttons */}
      <IconButton>
        <ForumIcon fontSize='large' className={headerIcon}/>
      </IconButton>
    </div>
  );

}

export default Header