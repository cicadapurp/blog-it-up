// is the same as auth.js in the file

const express = require("express")
const User = require("../models/user");
const signUpRouter = express.Router();
const jwt = require("jsonwebtoken");

// userRouter.post('/', (req,res,next) => {
//   const newUser = new User(req.body)
//   newUser.save( (err,user) => {
//     dataBaseChange(err,req,res,user)
//   })
// })

console.log()

signUpRouter.post('/signup', (req,res,next) => {

  User.findOne({name: req.body.name}, (err,existingUser) => { 
    
    if (err) {res.status(500).next(err)}

    if (existingUser !== null) {res.status(400).next(new Error('user name already exists'))}
    
    const newUser = new User(req.body)
      newUser.save( (err,user) => {
      if(err) {res.status(500).send(err)}
      
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
      console.log('token',token)
      console.log('user password', user.password)
      return res.status(201).send({success: true, user: user.withoutPassword(), token})
    })
  })
})

signUpRouter.post('/login', (req,res,next) => {
    User.findOne({name: req.body.name.toLowerCase()}, (err,user) => {
      if(err) {return next(err)}
      if(!user) {return res.status(403).next(new Error('email or password is incorrect'))}

      user.checkPassword(req.body.password, (err,match) => {
      if(err) {return res.status(500).send(err)};
      if(!match) {return res.status(401).send(new Error('email or password is incorrect'))}

      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
     
      return res.send({token: token, user: user.withoutPassword(), success: true, })
    })
  })
})





module.exports = signUpRouter