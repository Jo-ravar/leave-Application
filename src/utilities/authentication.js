var User = require('../models/users');


//Function containing role array which is check against role of the user

//If role of user is found in roles array then he is allowed to access further else denied
exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
        var user = req.user._id;
        User.findById({_id:user}, function(err, foundUser){
            console.log(foundUser.role);

            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
            if(roles.includes(foundUser.role)){
                return next();
            }
            else{
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
          }
        });
    }
}

//this file is used to check who can access the API