import axios from 'axios';
import React, {useState} from 'react'
import {createUseStyles} from 'react-jss'
import TinderCard from 'react-tinder-card'
import { useEffect } from 'react';
import { getUser } from '../../../redux/authReducer'
import {connect} from 'react-redux'
import { setMatches } from '../../../redux/matchReducer'

const useStyles = createUseStyles({
    Cards__cardContainer:{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10vh'
    },
    card:{
        h3:{
            position: 'absolute',
            bottom: '0',
            margin: '10px',
            color: 'fff'
        },
        position:'relative',
        width: '600px',
        padding: '20px',
        maxWidth: '85vw',
        height: '50vh',
        boxShadow: '0px 18px 53px 0px rgba(0, 0, 0, 0.3)',
        borderRadius: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    swipe: {
        position: 'absolute',
    },
    cardContent : {
        width: '100%',
        height: '100%'

    },
    name : {
        color: 'white',
        // backgroundColor: 'blue',
        minWidth: '70px',
        height:'30px'
    },
    age : {
        color: 'white',
        // backgroundColor: 'red',
        minWidth: '50px',
        fontSize: '20px',
        height:'30px'
        
        
    },
    bio : {
        color: 'white',
        textAlign: 'left',
        marginTop: '-10px'
        // background: 'linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,1))',
        // boxShadow: '5px 5px 5px black',

    },
    nameAndAge : {
        color: 'white',
        // backgroundColor: 'lightgreen',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '400px',

    },
    // swipeButtons: {
    //     position: 'relative',
    //     top: '60vh',
    //     display: '10vh',
    //     width: '100%',
    //     justifyContent: 'space-evenly',
    //     multiIconButtonRoot: {
    //         backgroundColor: "white",
    //         boxShadow: '0px 10px 53px 0px rgba(0, 0, 0, 0.3) !important'
    //     }
    // },
    // swipeButtons__repeat: {
    //     padding: '3vw !important',
    //     color: '#f5b748 !important'
    // },
    // swipeButtons__left: {
    //     padding: '3vw !important',
    //     color: '#ec5e6f !important'
    // },
    // swipeButtons__star: {
    //     padding: '3vw !important',
    //     color: '#62b4f9 !important'
    // },
    // swipeButtons__right: {
    //     padding: '3vw !important',
    //     color: '#76e2b3 !important'
    // },
    // swipeButtons__lightning: {
    //     padding: '3vw !important',
    //     color: '#915dd1 !important'
    // // }
    // }
})

const outOfFrame = (name) => {
    console.log(name+ ' left the screen!');
}

function Cards (props) {
    console.log(props)
    const {user, setMatches, matches, setRequests} = props
    const swiped = (direction, user2, sender) => {
        if(!sender){
        if(direction==='right'){
            console.log(user2)
        if(sender === user2){
            axios.post('/match/add', {user1: user.id, user2: user2})
            .then(res=> setMatches(...matches, res.data))
            .catch(err=> console.log(err))
            console.log(people)
            setPeople([...new Set(people)])
        }
        else{
            axios.post('/request/create', {sender_id: user.id, receiver_id: user2}).then(res=> res.data).catch(err=> console.log(err))
        }
        }
        if(direction==='left'){
           axios.delete(`/request/delete/${user2}/${user.id}`).then(res => setPeople(res.data)).catch(err=> console.log(err) )
        }
        console.log(people)
    }
    };
    const [matchArr, setMatchArr] = useState([])
    const [usersArr, setUsersArr] = useState([])


    const [people, setPeople] = useState([])


    useEffect(()=>{
            console.log(user)
            axios.get(`/request/received/${user.id}`)
            .then(res=> setPeople(res.data))
            .catch(err=> console.log(err))

            axios.get(`/match/all/${user.id}`)
            .then(res => setMatchArr(res.data))
            .catch(err=> console.log(err))

            axios.get(`/user/all/${user.id}`)
            .then(res=> setUsersArr(res.data))
            .catch(err=> console.log(err))         
    }, [])

    if(matchArr){
        console.log(matchArr)
        console.log(usersArr)
    }
    
    useEffect(()=> {
        if(matchArr[0] && usersArr[0]){
            setPeople([...people, ...usersArr])
        // matchArr.data.map(match=> setPeople(usersArr.data.filter(usr => usr.id !== match.id)))
    }
    }, [matchArr, usersArr])
    console.log(people)

    //render cards where the receiver id is = to the userid
    const {Cards, Cards__cardContainer, card, swipe, name, age, bio, nameAndAge} = useStyles()

//     const {Cards, Cards__cardContainer, card, swipe} = useStyles()

    return(
            <div className={Cards}>
                 <div className={Cards__cardContainer}>
                    {people.map((person)=> (
                    <TinderCard
                    className={swipe}
                    key={person.id}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir)=> swiped(dir, person.id, person.sender_id)}
                    onCardLeftScreen={()=>outOfFrame(person.first)}>
                        <div 
                        style={{background: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,1)), url(${person.url})`, backgroundSize: 'cover', backgroundPositionX: 'center', backgroundPositionY: 'center'}}  
                        className ={card}>
                        <div className={nameAndAge}>
                            <h3 className={name}>{person.first},</h3>
                            <h4 className={age}>{person.age}</h4>
                        </div>
                            <p className={bio}>{person.bio}</p>
                        </div>
                    </TinderCard>
                    ))}
                </div>
        </div>
    )
}

const mapStateToProps = state => {
  const { user } = state.auth
  const { matches } = state.match
  return { user, matches }
}

const mapDispatchToProps = {
  getUser, setMatches
}

export default  connect(mapStateToProps, mapDispatchToProps)(Cards)