module.exports = {
    getUsers: (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.params
        db.users.get_users(userId)
        .then(users => res.status(200).send(users))
        .catch(err=> console.log(err))
    }
}
