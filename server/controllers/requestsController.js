module.exports={
    createRequest: (req, res) => {
       const db = req.app.get('db')
       const {sender_id, receiver_id} = req.body
       const [newRequest] = db.request.create_request(sender_id, receiver_id)
       if(newRequest){
           res.status(200).send(newRequest)
       }else{
            return res.status(500).send('New request could not be made. Please check request ctrl.')
       }
    },
    deleteRequest: (req, res) => {
        const db = req.app.get('db')
        const {sender_id, receiver_id} = req.body
        db.request.delete_request(sender_id, receiver_id).then(results=> res.sendStatus(200)).catch(err=>console.log(err))
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