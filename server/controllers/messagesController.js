module.exports={
    //needs fixing
    sendMessage: async (db, io , socket, body, callback)=>{
        const {user, matchId, message_content} = body
        console.log(body)
        const [newMessage] = await db.messages.add_message(
           user.id,
           matchId,
           message_content
        )
        io.in(matchId).emit('message', {message: newMessage})
        callback()
    },
    join: async (db, io, socket, body) => {
        const {matchId} = body
        const messages = await db.messages.get_all_messages(matchId)
        console.log(matchId)
        socket.join(matchId)
        console.log(messages)
        socket.emit('messages', {messages})
    },
    
    // getAllMessages: (req, res) => {
    //     const db = req.app.get('db')
    //     const {matchId} = req.params
    //     const messages = await db.messages.get_all_messages(matchId)
    // }
}

//test