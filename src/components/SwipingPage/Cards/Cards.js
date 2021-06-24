import axios from 'axios';
import React, {useState} from 'react'
import {createUseStyles} from 'react-jss'
import TinderCard from 'react-tinder-card'

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

const swiped = (direction, nameToDelete) => {
    console.log('removing'+ nameToDelete);
    console.log('swiped '+ direction)
    //delete from requests table 
};

const outOfFrame = (name) => {
    console.log(name+ ' left the screen!');
}

function Cards ({user}) {
    const [people, setPeople] = useState([])

    useEffect(()=>{
            axios.get(`/request/received/${user.id}`).then(res=> 
            setPeople(res.data))
    }, [])

    //render cards where the receiver id is = to the userid
    const {Cards, Cards__cardContainer, card, swipe} = useStyles()
    return(
        <div className={Cards}>
            <div className={Cards__cardContainer}>
                 {people.map((person)=> (
                <TinderCard
                className={swipe}
                key={person.name}
                preventSwipe={["up", "down"]}
                onSwipe={(dir)=> swiped(dir, person.name)}
                onCardLeftScreen={()=>outOfFrame(person.name)}>
                    <div
                    style={{backgroundImage: `url(${person.url})`
                    }}className ={card}>
                        <h3>{person.name}</h3>
                    </div>
                </TinderCard>
                 ))}
            </div>
        </div>
    )
}

export default Cards