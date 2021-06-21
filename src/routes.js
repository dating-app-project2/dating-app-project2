import {Switch, Route} from 'react-router-dom'
import About from './components/About/About'
import LandingPage from './components/LandingPage'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

export default(
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path="/login" component={Login}/>
        <Route path = '/register' component={Register} />
        <Route path='/about' component={About}/>
    </Switch>
)