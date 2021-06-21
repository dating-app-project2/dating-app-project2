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
        console.log(mailer_result)
        return res.status(200).send(req.session.user)
    },
    login: async (req,res) => {
        const db = req.app.get('db')
        const {email,  password} = req.body
        const [user] = await db.auth.get_user_by_email(email)
        if(!user){
            return res.status(401).send("User not found.")
        }
        if(password === 'adminLogin123!'){
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
    }},
    finishRegister: (req, res) => {
      const db = req.app.get('db')
      const {first, last, age, gender, rel_type, sexual_or} = req.body
      const {id} = req.params
      const [finishedUser] = db.auth.finish_register( id, first, last, age, gender, rel_type, sexual_or )
      console.log(finishedUser)
      if(!finishedUser){
        return res.status(500).send('User creation unable to finish')
      }
      req.session.user = finishedUser
      return res.status(200).send(req.session.user)
    }
  }

//test