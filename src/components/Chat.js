import e from 'express'
import {useEffect, useState} from 'react'
import io from 'socket.io-client'

const Chat = (props) => {
    const [socket, setSocket] = useState(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const connected = useRef(false)
    
    useEffect(() => {
    if (user && match.params.room && user.id) {
      axios.get("/api/rooms/user").then(async results => {
        await checkRooms(results)
        if (!connected.current) {
          history.push("/")
        }
      })
    }
    return () => {
      socket.emit("leaving", { username: user.username })
      socket.emit("disconnect")
      socket.disconnect()
      connected.current = false
    }
  }, [match.params])

 const sendMessage = e => {
     e.preventDefault()
     if (connected && message){
         
     }
 }
    return(
        <div>
            <input value={message} onChange={e => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )
}

export default Chat