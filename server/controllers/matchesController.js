module.exports={
    addToMatches: (req, res) => {
        const db = req.app.get('db')
        const {user_1, user_2} = req.body
        db.match.add_match(user_1, user_2)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    removeFromMatches: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.match.delete_match(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))

    },
    getAllMatches: (req, res) => {
        const db = req.app.get('db')
        const {user_1} = req.body
        db.match.get_all_matches(user_1)
        .then(results => {
            res.status(200).send(results)
        })
        .catch(err => res.status(500).send(err))
    },
    getOneMatch: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.match.get_match(id)
        .then(results => {
            res.status(200).send(results)
        })
        .catch(err => res.status(500).send(err))
    }
}