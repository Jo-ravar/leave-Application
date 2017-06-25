var express = require('express'); 
var router = express.Router();  
var leave= require('../models/leave');
var Passport = require('passport');
var moment = require('moment'); 
var requireAuth = Passport.authenticate('jwt', {session: false});
var AuthenticationController = require('../utilities/authentication');

router.post('/application',requireAuth,AuthenticationController.roleAuthorization(['Employee']),function(req,res){
    if(!req.body.sdate ||!req.body.edate ||!req.body.ltype ||!req.body.reason)
    {
         res.json({ success: false, message: 'Please fill all details.' });
    }
    else{
        var stdate=new Date(Date.parse(moment(req.body.sdate).format('YYYY-MM-DD'))).toISOString();
        var endate=new Date(Date.parse(moment(req.body.edate).format('YYYY-MM-DD'))).toISOString();
        var newleave = new leave({
            start_date:stdate,
            end_date:endate,
            leaveType:req.body.ltype,
            reason:req.body.reason,
            requestBy:req.user.username,
        });
        newleave.save(function(err) {
            if (err) {
                 console.log("Error in making new leave application:--  "+JSON.stringify(err));
                 return res.json({ success: false, message: 'Something went wrong.'});
                 }
            res.json({ success: true, message: 'Successfully created your application.' });
        });
    }
});

router.get('/viewApplications',requireAuth,AuthenticationController.roleAuthorization(['Employee']),function(req,res){
    var user = req.user.username;
    leave.find({requestBy:user},function(err,data){
        if(err)
        {
            console.log("Error in displaying user applications:--  "+JSON.stringify(err));
            return res.json({ success: false, message: 'Unable to display'});
        }
        else{
            res.send(data);
        }

    })
 
});


 module.exports = router; 