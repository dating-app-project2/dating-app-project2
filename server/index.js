require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const userSocketIds  = {}
//user_id: socket.id

// userSocketIds[id]


const {
  CONNECTION_STRING, 
  SESSION_SECRET, 
  SERVER_PORT} = process.env;

//Controllers
const authCtrl = require('./controllers/authController')
const reqCtrl = require('./controllers/requestsController')
const matchCtrl = require('./controllers/matchesController');
const userCtrl = require('./controllers/usersController')
const msgCtrl = require('./controllers/messagesController')

const app = express();

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 *60 *60 *24}
}))

//massive connection 
massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
})
.then(db =>{
  app.set('db', db)
  console.log("Database Connected")
  //io stuff for server (required here)
  const io = require("socket.io")
  (app.listen(SERVER_PORT, () =>
console.log(`Server listening on ${SERVER_PORT}`)))
   //connection for io
   io.on('connection', (socket) =>{
     console.log(`Socket ${socket.id} connected`)
     socket.on('disconnect', () => {
       console.log(`Socket ${socket.id} disconnected`)
     })
    //  const db = req.app.get('db')
     //send message listener that will execute sendMessage()


     socket.on('sendMessage', (body) => 
    //  msgCtrl.sendMessage(db, io, socket, body, callback)
    {
      console.log(body)
      io.emit('relay-message', body)
    }
     )
     socket.on('join', (body, callback)=> 
     msgCtrl.join(db, io, socket, body, callback))
  
    //  socket.on("leaving", body => msgCtrl.leaving(io,  body))
    })
}).catch(err=>console.log(err))

//auth endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)
app.put('/auth/finishRegister', authCtrl.finishRegister)

//matches endpoints
app.post('/match/add', matchCtrl.addToMatches)
app.delete('/match/delete/:id', matchCtrl.removeFromMatches)
app.get('/match/all/:id', matchCtrl.getAllMatches)
app.get('/match/:id', matchCtrl.getOneMatch)

//requests endpoints
app.post('/request/create', reqCtrl.createRequest)
app.delete('/request/delete/:sender_id/:receiver_id', reqCtrl.deleteRequest)
app.get('/request/sent/:sender_id', reqCtrl.getSentRequests)
app.get('/request/received/:receiver_id', reqCtrl.getReceivedRequests)

//user endpoints 
app.get('/user/all/:userId', userCtrl.getUsers)
