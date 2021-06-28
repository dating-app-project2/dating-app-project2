import {Switch, Route} from 'react-router-dom'
import About from './components/About/About'
import LandingPage from './components/LandingPage'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import RegisterSurveyPage from './components/RegisterSurvey/RegisterSurveyPage'
import Chat from './components/Chat'
import Matches from './components/Matches'
import SwipingPage from './components/SwipingPage/SwipingPage'
import ProfilePage  from './components/Profile/ProfilePage'


export default(
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path="/login" component={Login}/>
        <Route path = '/register' component={Register} />
        <Route path='/about' component={About}/>
        <Route path="/registerSurveyPage" component={RegisterSurveyPage}/>
        <Route path="/chat/:matchId" component={Chat}/>
        <Route path="/swipingPage" component={SwipingPage}/>
        <Route path="/matches" component={Matches}/>
    </Switch>
)