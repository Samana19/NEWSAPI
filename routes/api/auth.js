const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User")

const secretKey = require("../../")


router.post('/register',(req,res,next)=>{
  User.findOne({username:req.body.username})
  .then(user=>{
      if(user) return res.status(400)
      .json({error:"user already registered"})

      bcrypt.hash(req.body.password,10,(err,hash)=>{
          if(err){
              return res.status(500).json({error:err.message})
          }
          else{
              const user = {
                  username:req.body.username,
                  email:req.body.email,
                  password:hash
              }
              User.create(user)
              .then((user)=>{
                  res.status(200).json(user)
              })
              .catch(next)
          }
      })
  }).catch(next);
})

router.post('/login',(req,res,next)=>{
    const { username, password } = req.body;
    User.findOne({ username })
      .then((user) => {
        if (!user) return res.status(401).json({ error: 'User not registered' });
  
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
  
          if (!result) {
            return res.status(401).json({ error: 'Wrong password' });
          }
  
          // Login successful, generate JWT
          const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });
  
          // Include the token in the response
          res.json({ message: 'Login successful', token });
        });
      })
      .catch(next);
})


module.exports = router;
