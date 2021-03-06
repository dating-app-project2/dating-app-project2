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
        height: '500px',
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
        minWidth: '40px',
        height:'30px',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    age : {
        color: 'white',
        // backgroundColor: 'red',
        minWidth: '50px',
        fontSize: '20px',
        height:'30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
        
        
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
        marginTop: '-10px'
        

    },
    allUserCardInfo : {
        // backgroundColor: 'lightgreen',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        bottom: '0px'


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
    const {user, setMatches, matches} = props
    const [matchArr, setMatchArr] = useState([])
    const [usersArr, setUsersArr] = useState([])
    const [receivedArr, setReceivedArr] = useState([])
    const [sentArr, setSentArr] = useState([])
    const [people, setPeople] = useState([])
    //first step is to get all the users that aren't equal to our user id and save that to an array of objects that we can map over

    //we then need to check and see if any of those users are already in our match table. if they are, we need to remove them from the array
   useEffect(()=>{
            console.log(user)
            axios.get(`/request/received/${user.id}`)
            .then(res=> setReceivedArr(res.data))
            .catch(err=> console.log(err))

            axios.get(`/match/all/${user.id}`)
            .then(res => setMatchArr(res.data))
            .catch(err=> console.log(err))

            axios.get(`/user/all/${user.id}`)
            .then(res=> setUsersArr(res.data))
            .catch(err=> console.log(err))
            
            axios.get(`/request/sent/${user.id}`)
            .then(res=> setSentArr(res.data))
            .catch(err=> console.log(err))
    }, [])
    
    const swiped = (direction, user2) => {
        const requested = receivedArr.find((request)=> request.id === user2)
        if(direction==='right'){
        if(requested){
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
        if(direction==='left'&& requested){
           axios.delete(`/request/delete/${user2}/${user.id}`).then(res => setReceivedArr([...new Set(res.data)])).catch(err=> console.log(err) )
        }
        console.log(people)
        console.log(receivedArr)
    };
    useEffect(()=> {
        if(usersArr[0]){
           const noMatches =  usersArr.filter((user)=> {
             const found = matchArr.find((match)=> match.id === user.id)
             return found ? false : true
           })
           console.log('People arr with no matches is ', noMatches)
            
          const noSentRequests =  noMatches.filter((user)=> {
               const sentRequest = sentArr.find((sent)=> sent.sender_id === user.id)
               return sentRequest ? false : true
           })
           setPeople(noSentRequests)
           console.log('People arr with no sent requests is ', noSentRequests)
        // matchArr.data.map(match=> setPeople(usersArr.data.filter(usr => usr.id !== match.id)))
    }
    }, [matchArr, usersArr])
    console.log(people)

    //render cards where the receiver id is = to the userid
    const {Cards, Cards__cardContainer, card, swipe, name, age, bio, nameAndAge, allUserCardInfo} = useStyles()

//     const {Cards, Cards__cardContainer, card, swipe} = useStyles()

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
                        style={{background: `linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,1)), url(${person.url})`, backgroundSize: 'cover', backgroundPositionX: 'center', backgroundPositionY: 'center'}}  
                        className ={card}>
                        <div className={allUserCardInfo}>
                        <div className={nameAndAge}>
                            <h3 className={name}>{person.first},</h3>
                            <h4 className={age}>{person.age}</h4>
                        </div>
                            <p className={bio}>{person.bio}</p>
                        </div>
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