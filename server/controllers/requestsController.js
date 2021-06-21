module.exports={
    createRequest: (req, res) => {
       const db = req.app.get('db')
       const {sender_id, receiver_id} = req.body
       db.request.create_request(sender_id, receiver_id)
       .then(results=> res.status(200).send(results))
       .catch(err=>console.log(err))
    },
    deleteRequest: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.request.delete_request(id)
        .then(results=> res.sendStatus(200))
        .catch(err=>console.log(err))
    },
    getSentRequests: (req, res) => {
        const db = req.app.get('db')
        const {sender_id} = req.params
        db.request.get_sent_requests(sender_id)
        .then(results=> res.status(200).send(results))
        .catch(err=> console.log(err))
    },
    getReceivedRequests: (req, res) => {
        const db = req.app.get('db')
        const {receiver_id} = req.params
        db.request.get_received_requests(receiver_id)
        .then(results=> res.status(200).send(results))
        .catch(err=> console.log(err))
    }
}