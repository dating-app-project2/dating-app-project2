module.exports={
    addToMatches: (req, res) => {
        const db = req.app.get('db')
        const {user1, user2} = req.body
        db.post.add_match(user1, user2)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    removeFromMatches: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.post.delete_match(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))

    },
    getAllMatches: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.post.get_all_matches(id)
        .then(results => {
            res.status(200).send(results)
        })
        .catch(err => res.status(500).send(err))
    },
    getOneMatch: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.post.get_match(id)
        .then(results => {
            res.status(200).send(results)
        })
        .catch(err => res.status(500).send(err))
    }
}