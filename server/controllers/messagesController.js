module.exports={
    sendMessage: async (db, io , socket, body, callback)=>{
        const {user, match, message} = body
        const newMessage = await db.messages.add_message(
            user.id,
            match,
            user.first,
            message
        )
        io.in(match).emit('message', {message: newMessage[0]})
        callback()
    },
    join: async (db, io, socket, body) => {
        const {match} = body
        const messages = await db.messages.get_all_messages(match)
        socket.join(match)
        socket.emit('messages', {messages})
    }
}

