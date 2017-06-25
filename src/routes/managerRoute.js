var express = require('express'); 
var router = express.Router();  
var leave= require('../models/leave');
var Passport = require('passport');
var moment = require('moment'); 
var requireAuth = Passport.authenticate('jwt', {session: false});
var AuthenticationController = require('../utilities/authentication');

router.get('/viewAll',requireAuth,AuthenticationController.roleAuthorization(['Manager']),function(req,res){

leave.find({},function(err,data){
        if(err)
        {
            console.log("Error in displaying employee applications:--  "+JSON.stringify(err));
            return res.json({ success: false, message: 'Unable to display'});
        }
        else{
            res.send(data);
        }

    });
});

router.put('/respond',requireAuth,AuthenticationController.roleAuthorization(['Manager']),function(req,res){
   if(!req.query.appId)
   {
        res.json({ success: false, message: 'Please provide application Id' });
   }
    var query={_id:req.query.appId}
   if(req.body.status=='Approved')
   {
       var approvedDate=moment(new Date()).format('YYYY-MM-DD');
       console.log("Date of approval:-- "+approvedDate);
    leave.update(query,{$set:{ approvalStatus:req.body.status, approvedAt:approvedDate}},{new:false},function(err,result){
        if(err)
        {
            console.log("Error in Editing " + JSON.stringify(err));
            return res.json({ success: false, message: 'Something went wrong.'});
        }
         res.json({ success: true, message: 'Successfully Approved.' });
     });
   }
   else{
       leave.update(query,{$set:{ approvalStatus:req.body.status}},{new:false},function(err,result){
        if(err)
        {
            console.log("Error in Editing " + JSON.stringify(err));
            return res.json({ success: false, message: 'Something went wrong.'});
        }
         res.json({ success: true, message: 'Successfully Responded.' });
     });

   } 
});

module.exports = router; 