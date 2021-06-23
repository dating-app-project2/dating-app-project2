import Cards from './Cards/Cards'
import SwipeButtons from './SwipeButtons/SwipeButtons'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    SwipingPage: {
        display: 'flex',
        flexDirection: "column",
        textAlign: 'center'
    },
})

function SwipingPage() {
    const {SwipingPage} = useStyles()

  return (
    <div className={SwipingPage}>
      <Cards/>
      <SwipeButtons/>
    </div>
  );
export default SwipingPage;
