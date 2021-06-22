import Header from './Header/Header'
import Cards from './Cards/Cards'
import Buttons from './Buttons/Buttons'
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
    SwipingPage: {
        textAlign: 'center'
    },
})

function SwipingPage() {
    const {SwipingPage} = useStyles()

  return (
    <div className={SwipingPage}>
      <Header/>
      <Cards/>
      <Buttons/>
    </div>
  );
}

export default SwipingPage;
