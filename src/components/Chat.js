import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import io from "socket.io-client"
import TextField from "@material-ui/core/TextField"
import { createUseStyles } from "react-jss"
import Button from "@material-ui/core/Button"
import axios from "axios"
import { toast } from "react-toastify"
import Sockets from "./Sockets"

// const useStyles = createUseStyles({
//     chatSectionBox: {
//       width: "400px",
//       height: "500px",
//       display: "flex",
//       justifyContent: "space-between",
//       flexDirection: "column",
//       alignItems: "flex-end",
//       backgroundColor: "white"
//     },
//     chatSection: {
//       width: "400px",
//       height: "85%",
//       display: "flex",
//       justifyContent: "flex-start",
//       alignItems: "center",
//       backgroundColor: "white",
//       flexDirection: "column",
//       borderBottom: "1px solid black",
//       overflow: "auto"

//     },
//     inputAndBtn: {
//       width: "400px",
//       height: "15%",
//       display: "flex",
//       justifyContent: "space-around",
//       alignItems: "center",
//       backgroundColor: "white",
//       flexDirection: "row",

//     }
//   })

const Chat = ({user, match, history}) => {
    // const [socket, setSocket] = useState(null)
    // const [message, setMessage] = useState('')
    // const [messages, setMessages] = useState([])

    // const connected = useRef(false)

    // const { chatSectionBox } = useStyles()
    // const { chatSection } = useStyles()
    // const { inputAndBtn } = useStyles()


//     useEffect(() => {
//         setSocket(io.connect())
//         return () => {
//             socket.disconnect()
//             setSocket(null)
//         }
      
//   }, [])

//   useEffect(() => {
//     if(socket){
//         socket.on('relay-message', (body) => {
//             console.log(body)
//             setMessages((m) => [...m, body])
//         })
// }
// }, [socket])

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

  // const sendMessage = e => {
  //   e.preventDefault()
  //   if (connected && message) {
  //     socket.emit( "sendMessage",
  //       {
  //         // name: user.first,
  //         message
  //       },
  //       () => {
  //         setMessage("")
  //       }
  //     )
  //   } else {
  //     toast.error("Cannot send blank messages")
  //   }
  // }
    return(
      <div>
        <Sockets />
      </div>
      // <div >
      //   <div >
      //     <h1>Chat</h1>
      //   </div>
      //       <div className={chatSectionBox}>
      //         <div className={chatSection}>
      //           {messages.map((body) => (
      //             <div>
      //                   {body.message}
      //               </div>
      //           ))}
      //         </div>
      //           <div className={inputAndBtn}>
      //             <TextField
      //                 value={message}
      //                 placeholder="send message"
      //                 onChange={e => setMessage(e.target.value)}
      //                 onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
      //                 />
      //             <Button
      //                 variant="contained"
      //                 color="primary"
      //                 onClick={e => sendMessage(e)}
      //                 >
      //                 Send
      //             </Button>
      //           </div>
      //       </div>
      // </div>
    )
}

export default Chat
//  test
//  test
//  test