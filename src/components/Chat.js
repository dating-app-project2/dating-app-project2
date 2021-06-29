import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import io from "socket.io-client"
import TextField from "@material-ui/core/TextField"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { getUser } from '../redux/authReducer'
import { toast } from "react-toastify"

const useStyles = createUseStyles({
    chatSectionBox: {
      width: "450px",
      height: "600px",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      alignItems: "flex-end",
      backgroundColor: "white"
    },
    chatSection: {
      width: "450px",
      height: "85%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "white",
      flexDirection: "column",
      borderBottom: "1px solid black",
      overflow: "auto"

    },
    inputAndBtn: {
      width: "400px",
      height: "15%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      flexDirection: "row",
      marginRight: "20px"

    },
    inputBox: {
      width: "300px",

    },
    userMsg: {
      // backgroundColor: "red",
      width: "450px",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center"
    },
    matchMsg: {
      // backgroundColor: "yellow",
      width: "450px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center"

    },
    msgName: {
      marginLeft: "10px",
      marginRight: "10px"

    },
    messsageContent: {
      border: "1px solid black",
      padding: "5px" ,
      paddingLeft: "10px" ,
      paddingRight: "10px" ,
      borderRadius: "50px"

    }
  })

const Chat = (props) => {
  const {user, match, history} = props
  const {matchId} = match.params
  // console.log(props)

    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const connected = useRef(false)

    const { chatSectionBox } = useStyles()
    const { chatSection } = useStyles()
    const { inputBox } = useStyles()
    const { inputAndBtn } = useStyles()
    const { matchMsg } = useStyles()
    const { userMsg } = useStyles()
    const { msgName } = useStyles()
    const { messsageContent } = useStyles()

    useEffect(() => {
      setSocket(io.connect())
      return () => {
          if (socket){ 
          socket.disconnect()
          setSocket(null)
      }else{
          console.log('Socket is null')
      }
      }
}, [])

    useEffect(()=> {
      if(socket){
      socket.emit('join', {matchId})
      socket.on('messages', messages=> {
        setMessages(messages.messages)
      } )
      }
    }, [socket])

    // console.log(messages)

//   useEffect(() => {
//     if(socket){
//         socket.on('relay-message', (body) => {
//             console.log(body)
//             setMessages((m) => [...m, body])
//         })
// }
// }, [socket])


//  useEffect(()=> {
//      socket.on('messages', (body)=> {
//        console.log(body)
//        setMessages((m)=> [...m, body])
//      })
//     }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (connected && message) {
      socket.emit( "sendMessage",{ user, matchId, message}, () => { setMessage("")})
    } else {
      toast.error("Cannot send blank messages")
    }
  }



    return(
        <div >
        <div >
          <h1>Chat</h1>
        </div>
            <div className={chatSectionBox}>
              <div className={chatSection}>
                {console.log(messages)}
                {messages.map((body) => (
                  <div>
                    {body.userid === user.id ? 
                    <div className={userMsg}>
                    <p className={messsageContent}>{body.message_content}</p>  
                    <p className={msgName}>{user.first}</p>
                    </div> :
                    <div className={matchMsg}> 
                    <p className={msgName}>{body.first}</p>
                    <p className={messsageContent}>{body.message_content}</p>
                    </div>}
                  </div>
                ))}
              </div>
                <div className={inputAndBtn}>
                  <TextField
                      value={message}
                      className={inputBox}
                      placeholder="send message"
                      onChange={e => setMessage(e.target.value)}
                      onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
                      />
                  <Button
                      variant="contained"
                      color="primary"
                      onClick={e => sendMessage(e)}
                      >
                      Send
                  </Button>
                </div>
            </div>
      </div>
    )
}


const mapStateToProps = state => {
  const { user } = state.auth
  return { user }
}

const mapDispatchToProps = {
  getUser
}

export default  connect(mapStateToProps, mapDispatchToProps)(Chat)
//  test
//  test
//  test

  //   useEffect(() => {
  //   if (user && match.params.room && user.id) {
  //     axios.get("/api/rooms/user").then(async results => {
  //       setSocket(io.connect(""))
  //       if (!connected.current) {
  //         history.push("/")
  //       }
  //     })
  //   }
  //   return () => {
  //     connected.current = false
  //   }
  // }, [match.params])




  // const checkRooms = res => {
  //   res.data.forEach(room => {
  //     if (+room.chatroom_id === +match.params.room) {
  //       socket.emit("join", {
  //         username: user.username,
  //         room: match.params.room
  //       })
 
  //       connected.current = true
  //       socket.on("message", message => {
  //         setMessages((messages = [message.message, ...messages]))
  //       })
  //       socket.on("messages", incomingMessages => {
  //         setMessages((messages = [...incomingMessages.messages]))
  //       })
  //     }
  //   })
  // }