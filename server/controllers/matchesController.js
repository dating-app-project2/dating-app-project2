module.exports={
    addToMatches: (req, res) => {
        const db = req.app.get('db')
        const {user1, user2} = req.body
        console.log(req.body)
        console.log(user2)
        db.match.add_match(+user1, +user2)
        .then((matches) => res.status(200).send(matches))
        .catch(err => {
            console.log(err)
            res.status(500).send(err)})
    },
    removeFromMatches: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.match.delete_match(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    getAllMatches: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const allMatches = await db.match.get_all_matches(+id)
        return res.status(200).send(allMatches)}
        catch(err){
            console.log(err)
            return res.status(500).send(`Unable to get all matches for ${id}`)
        }
    }
        ,
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