import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import io from "socket.io-client"
import TextField from "@material-ui/core/TextField"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { toast } from "react-toastify"

const useStyles = createUseStyles({
    chatSection: {
      width: "400px",
      height: "65%",
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "column",
      alignItems: "flex-end",
      paddingBottom: "10px",
      backgroundColor: "white"
    },
    chatSection2: {
      width: "400px",
      height: "45%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "flex-start",
      paddingBottom: "10px",
      backgroundColor: "white"
    }
  })

const Chat = ({user, match, history}) => {
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const connected = useRef(false)

    const { chatSection } = useStyles()
    const { chatSection2 } = useStyles()


    useEffect(() => {
        setSocket(io.connect())
        return () => {
            socket.disconnect()
            setSocket(null)
        }
      
  }, [])

  useEffect(() => {
    if(socket){
        socket.on('relay-message', (body) => {
            console.log(body)
            setMessages((m) => [...m, body])
        })
}
}, [socket])

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

  const sendMessage = e => {
    e.preventDefault()
    if (connected && message) {
      socket.emit( "sendMessage",
        {
          // name: user.first,
          message
        },
        () => {
          setMessage("")
        }
      )
    } else {
      toast.error("Cannot send blank messages")
    }
  }
    return(
        <div >
        <div >
          <h1>Chat</h1>
        </div>
            <div className={chatSection}>
              <div className={chatSection2}>
                {messages.map((body) => (
                    <div>
                        {body.message}
                    </div>
                ))}
              </div>
                <TextField
                    value={message}
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
    )
}

export default Chat
//  test
//  test
//  test