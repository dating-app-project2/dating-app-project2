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
    getAllMatches: async (req, res) => {
        try{
        const db = req.app.get('db')
        const {user_1} = req.params
        try{
            const firstArr = await db.match.get_all_matches(user_1)
            const secondArr = await db.match.get_all_matches2(user_1)
            const bigArr = [...firstArr, ...secondArr]
            return res.status(200).send(bigArr)
        }
        catch(err){
            console.log(err)
            return res.status(500).send(`Unable to get all matches for ${user_1}`)
        }
        
    }
        catch{
            res.status(500).send(err)
        }
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