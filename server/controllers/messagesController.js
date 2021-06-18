module.exports={
    sendMessage: async (db, io , socket, body, callback)=>{
        const {user, match, message} = body
        const newMessage = await db.messages.add_message(
            user.id,
            user.first,
            match,
            message
        )
        io.in(match).emit('message', {message: newMessage[0]})
        callback()
    },
    join: async (db, io, socket, body) => {
        const {room} = body
        const messages = await db.messages.get_all_messages(match)
        socket.join(room)
        socket.emit('messages', {messages})
    }
}

