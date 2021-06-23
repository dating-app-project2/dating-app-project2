import Cards from './Cards/Cards'
import SwipeButtons from './SwipeButtons/Buttons'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    SwipingPage: {
        display: 'flex',
        flexDirection: "column",
        textAlign: 'center'
    },
})

export default function SwipingPage() {
    const {SwipingPage} = useStyles()

  return (
    <div className={SwipingPage}>
      <Cards/>
      <SwipeButtons/>
    </div>
  )};
  