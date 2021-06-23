import React from 'react'
import {createUseStyles} from 'react-jss'
import ReplayIcon from '@material-ui/icons/Replay'
import CloseIcon from '@material-ui/icons/Close'
import StarRateIcon from '@material-ui/icons/StarRate'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import  IconButton from '@material-ui/core/IconButton'

const useStyles = createUseStyles({
    swipeButtons: {
        position: 'fixed',
        bottom: '10vh',
        display: '10vh',
        width: '100%',
        justifyContent: 'space-evenly',
        multiIconButtonRoot: {
            backgroundColor: "white",
            boxShadow: '0px 10px 53px 0px rgba(0, 0, 0, 0.3) !important'
        }
    },
    swipeButtons__repeat: {
        padding: '3vw !important',
        color: '#f5b748 !important'
    },
    swipeButtons__left: {
        padding: '3vw !important',
        color: '#ec5e6f !important'
    },
    swipeButtons__star: {
        padding: '3vw !important',
        color: '#62b4f9 !important'
    },
    swipeButtons__right: {
        padding: '3vw !important',
        color: '#76e2b3 !important'
    },
    swipeButtons__lightning: {
        padding: '3vw !important',
        color: '#915dd1 !important'
    }
})
const swiped = () => {

}

function SwipeButtons() {
    const {swipeButtons, swipeButtons__repeat, swipeButtons__left, swipeButtons__right, swipeButtons__star, swipeButtons__lightning} = useStyles()
    return(
        <div className={swipeButtons}>
            <IconButton onClick={swiped} className={swipeButtons__repeat}>
                <ReplayIcon fontSize="large"/>
            </IconButton>
            <IconButton onClick={swiped} className={swipeButtons__left}>
                <CloseIcon fontSize="large"/>
            </IconButton>
            <IconButton onClick={swiped} className={swipeButtons__star}>
                <StarRateIcon fontSize="large"/>
            </IconButton>
            <IconButton onClick={swiped} className={swipeButtons__right}>
                <FavoriteIcon fontSize="large"/>
            </IconButton>
            <IconButton onClick={swiped} className={swipeButtons__lightning}>
                <FlashOnIcon fontSize="large"/>
            </IconButton>
        </div>
    )
}

export default SwipeButtons;