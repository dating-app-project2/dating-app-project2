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
      justifyContent: 'flex-start',
      alignItems: "flex-start",
      borderBottom: "1px solid black",
      backgroundColor: "white",
      overflow: 'auto',
      
    },
    matchImg:{
      height: '90px'

    },
    matchImgBox:{
      width: '70px',
      height: '70px',
      borderRadius: "50%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      // backgroundColor: "blue",
    },
    eachMatch:{
      width: '90px',
      height: '100px',
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "blue",
    }
  })

const Matches = ({user}) => {
    const { messagesBox } = useStyles()
    const { matches } = useStyles()
    const { eachMatch } = useStyles()
    const { matchImg } = useStyles()
    const { matchImgBox } = useStyles()
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
                                  <div className={eachMatch}>
                                    <div className={matchImgBox}><img
                                    src={match.url} className={matchImg}/></div>
                                    {match.first}
                                  </div>
                                   
                                </div>)
                            }

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
