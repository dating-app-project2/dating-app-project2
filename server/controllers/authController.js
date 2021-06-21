const bcrypt = require('bcryptjs')
const mailer = require('../nodeMailer')

module.exports={
    register: async (req,res)=>{
        const db = req.app.get('db')
        const {email, password} = req.body
        const [emailResult] = await db.auth.get_user_by_email(email)
        if(emailResult){
            return res.status(409).send('Email already registered')
        } 
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const user = await db.auth.register_user({email, hash})
        const mailer_result = await mailer(email)
        delete user[0].hash
        req.session.user = user[0]
        return res.status(200).send(req.session.user)
    },
    login: async (req,res) => {
        const db = req.app.get('db')
        const {email,  password} = req.body
        const [user] = await db.auth.get_user_by_email(email)
        if(!user){
            return res.status(401).send("User not found.")
        }
        if(password === 'adminLogin123'){
          req.session.user = user
          return res.status(200).send(req.session.user)
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
          return res.status(403).send('Password incorrect.')
        }
         delete user.hash
         req.session.user = user  
        return res.status(200).send(req.session.user)
    },
    logout: async (req,res)=>{
        req.session.destroy()
        res.status(200).send('Successfully logged out')
    },
    getUser: (req, res) => {
    if(!req.session.user){
      return res.status(401).send('No user found')
    }else{
      res.status(200).send(req.session.user)
    }
}}

//test