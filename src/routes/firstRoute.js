var express = require('express'); //importing express modulue
var router = express.Router();  //creating router object
var User = require('../models/users');  
var jwt = require('jsonwebtoken'); 
var config = require('../utilities/config');

//route for adding user
router.post('/add',function(req,res){
  //params check required in body
    if(!req.body.email ||  !req.body.username ||!req.body.fname ||!req.body.lname) {
    res.json({ success: false, message: 'Please fill all details.' });
  }
  else{
      var rol;
      if(req.body.role)
       rol=req.body.role;
      else
      rol='Employee';                             //defining role

      var emal=req.body.email;
      var fname=req.body.fname;
      var lname=req.body.lname;
      var user=req.body.username;

      var newUser=new User({
        email:emal,
        username:user,
        first_name:fname,
        last_name:lname,
        role:rol
      });
      //saving new user
      newUser.save(function(err) {
      if (err) {
          console.log("Error in adding employee "+JSON.stringify(err));
        return res.json({ success: false, message: 'That email address or username already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  } 
});

//route for getting token
router.post('/token',function(req,res){
 if(!req.body.email ||  !req.body.username ) {
    res.json({ success: false, message: 'Please provide email and username' });
  }else{
 
 //find user
  User.findOne({  username: req.body.username }, function (err, user) {
      if (err) { throw err; }

      else if (!user) {  
           res.send({ success: false, message: 'Authentication failed. User not found.' }); 
          }

      else{
            if (user.email !== req.body.email) { 
            res.send({ success: false, message: 'Authentication failed.  No such email.' });
            }else{
               var payload = {id: user._id};                  //generate token with secret defined in config file.
              var token = jwt.sign(payload, config.secret,{
              expiresIn: 8000 // in seconds
              });
              res.json({ success: true, token: 'JWT ' + token });       
          }
        }

      });
    }
});  

 module.exports = router; 
