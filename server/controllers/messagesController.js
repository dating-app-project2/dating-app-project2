module.exports={
    //needs fixing
    sendMessage: async (db, io , socket, body, callback)=>{
        const {user, matchId, message} = body
        const newMessage = await db.messages.add_message(
           user.id,
           matchId,
           message_content
        )
        // io.in(matchId).emit('message', {message: newMessage[0]})
        // callback()
    },
    join: async (db, io, socket, body) => {
        const {match} = body
        const messages = await db.messages.get_all_messages(match)
        socket.join(match)
        socket.emit('messages', {messages})
    }
}

//test