import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import io from "socket.io-client"
import TextField from "@material-ui/core/TextField"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { toast } from "react-toastify"
import {setUser} from '../redux/authReducer'
import {getUser} from '../redux/authReducer'
import Header from "./Header"

const useStyles = createUseStyles({
    messagesBox: {
      width: "450px",
      height: "600px",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      alignItems: "flex-end",
      backgroundColor: "white"
    },
    matches: {
      width: "450px",
      height: "100px",
      display: "flex",
    //   justifyContent: "space-between",
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: "flex-start",
      borderBottom: "1px solid black",
      backgroundColor: "white",
      overflow: 'auto'
    },
    match:{
    },
    matchImg:{
      width: '100px'
    }
  })

const Matches = ({user}) => {
    const { messagesBox } = useStyles()
    const { matches } = useStyles()
    const { matchImg } = useStyles()
    const [allMatches, setAllMatches] = useState([])


    useEffect(() => {
        {user && 
        axios.get(`/match/all/${user.id}`)
        .then(res => {setAllMatches(res.data)})
        .catch(err => console.log(err))}
    }, [])

    
    return(
        <div>
            <h1>Matches</h1>
            <div className={messagesBox}>
                <div className={matches}>

                {allMatches.map((match) => {
                  console.log(match.id)
                            if (match.id != user.id) {
                                return (
                                <div key={match.user_2}
                                className={match}>
                                  {console.log(match)}
                                   <img
                                    src={match.url} className={matchImg}/>
                                    {match.first}
                                </div>)
                            }
                            
                        
                    //     return (
                    // )
                    // }
            })}
                    
                </div>
            </div>
      </div>
    )
}

const mapStateToProps = state => {
  const { user } = state.auth
  return {user}
}

const mapDispatchToProps = {
  getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches)
