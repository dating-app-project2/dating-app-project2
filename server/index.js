require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const {
  CONNECTION_STRING, 
  SESSION_SECRET, 
  SERVER_PORT} = process.env;

//Controllers
const authCtrl = require('./controllers/authController')
const reqCtrl = require('./controllers/requestsController')
const matchCtrl = require('./controllers/matchesController');
const msgCtrl = require('./controllers/messagesController');

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
   console.log(`Server listening on ${SERVER_PORT}`) , 
   {cors: {origin: true}}))
   //connection for io
   io.on('connection', socket=>{
     const db = req.app.get('db')
     //send message listener that will execute sendMessage()
     socket.on('sendMessage', (body, callback)=> 
     msgCtrl.sendMessage(db, io, socket, body, callback))
     socket.on('join', (body, callback)=> 
     msgCtrl.join(db, io, socket, body, callback))
     socket.on("leaving", body => msgCtrl.leaving(io,  body))
   })
}).catch(err=>console.log(err))

//auth endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

//matches endpoints
app.post('/match/add', matchCtrl.addToMatches)
app.delete('/match/:id', matchCtrl.removeFromMatches)
app.get('/match/all', matchCtrl.getAllMatches)
app.get('/match/:id', matchCtrl.getOneMatch)

//requests endpoints
app.post('/request/create', reqCtrl.createRequest)
app.delete('/request/:id', reqCtrl.deleteRequest)
app.get('/request/sent', reqCtrl.getSentRequests)
app.get('/request/received', reqCtrl.getReceivedRequests)

//messages are being managed in io. Scroll up for sockets info

