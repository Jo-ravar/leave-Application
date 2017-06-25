var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./src/utilities/config');
mongoose.connect(config.db);
require('./src/utilities/passport')(passport);

var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(passport.initialize());

var firstRoute=require('./src/routes/firstRoute');
var empRoute=require('./src/routes/employeeRoute');
var manRoute=require('./src/routes/managerRoute');
app.use('/',firstRoute); 
app.use('/employee',empRoute);
//app.use('/manager',manRoute);
app.listen(app.get('port'),function(err) {
    if(!err)
    {
        console.log("server started at port 3000");
    }
});