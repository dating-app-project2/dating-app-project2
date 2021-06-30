module.exports={
    sendMessage: async (req, res)=>{
       try {
        const db = req.app.get('db')
        const {user, matchId, message_content} = req.body
        console.log(req.body)
        const [newMessage] = await db.messages.add_message(
           user.id,
           matchId,
           message_content
        )
        newMessage.first = user.first
        return res.status(200).send(newMessage)}
        catch(err){
            console.log(err)
            return res.status(500).send(err)
        }
    },
    join: async (db, io, socket, body) => {
        const {matchId} = body
        const messages = await db.messages.get_all_messages(matchId)
        console.log(matchId)
        socket.join(matchId)
        console.log(messages)
        socket.emit('messages', {messages})
    },
}