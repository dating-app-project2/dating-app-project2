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
        backgroundColor:'fff',
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
    }
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

    const {Cards, Cards__cardContainer, card, swipe} = useStyles()
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
                        <div style={{backgroundImage: `${person.url}`
                        }}className ={card}>
                            <h3>{person.first}</h3>
                            <h4>{person.age}</h4>
                            <p>{person.bio}</p>
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