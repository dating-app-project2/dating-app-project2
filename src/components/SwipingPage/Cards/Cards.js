import axios from 'axios';
import React, {useState} from 'react'
import {createUseStyles} from 'react-jss'
import TinderCard from 'react-tinder-card'
import { useEffect } from 'react';
import { getUser } from '../../../redux/authReducer'
import {connect} from 'react-redux'
import { setMatches } from '../../../redux/matchReducer'

const useStyles = createUseStyles({
    Cards:{

    },
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
    },
    
})



const outOfFrame = (name) => {
    console.log(name+ ' left the screen!');
}

function Cards (props) {
    console.log(props)
    const {user, setMatches, matches}= props
    const swiped = (direction, user2) => {
        if(direction==='right'){
        axios.post('/match/add', [user.id, user2])
        .then(results => {
           setMatches(results.data) 
        })
        .catch(err=> console.log(err))
        }
    };
    const [people, setPeople] = useState([])

    useEffect(()=>{
            console.log(user)
            axios.get(`/request/received/${user.id}`)
            .then(res=> setPeople(res.data))
            .catch(err=> console.log(err))
    }, [])

    //render cards where the receiver id is = to the userid
    const {Cards, Cards__cardContainer, card, swipe} = useStyles()
    return(
        <div className={Cards}>
            <div className={Cards__cardContainer}>
                 {people.map((person)=> (
                <TinderCard
                className={swipe}
                key={person.id}
                preventSwipe={["up", "down"]}
                onSwipe={(dir)=> swiped(dir, person.id)}
                onCardLeftScreen={()=>outOfFrame(person.first)}>
                    <div
                    style={{backgroundImage: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_W6S2_Navkn8juCmGvny5FzStxlsUMYQm-6cRh_2N-v1ctUY`
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