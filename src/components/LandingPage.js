import React, {useEffect} from 'react'
import {connect} from 'react-redux'

const LandingPage = ({user, history}) => {
    useEffect(()=> {
        if(user && user.id){
            history.push('/swipingPage')
        }else{
            history.push('/register')
        }
    }, [user, history])
    return (<div>Landing Page</div>)
}

const mapStateToProps = (state) => {
    const {user} = state.auth
    return {user}
}

export default connect(mapStateToProps)(LandingPage)