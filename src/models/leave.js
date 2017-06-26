var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

//leave schema defined with require fields and enums
var leaveSchema = new Schema({
    start_date:{type:Date ,required:true},
    end_date:{type:Date ,required:true},
    leaveType:{
        type:String,
        required:true,
        enum:['Sick','FMLA','Vacation','Maternity','Paternity','Pregnancy','Bereavement','Personal'],
        default:'Sick'
    },
    reason:{type:String,required:true},
    requestBy:{type:String,required:true},
    requestAt:{type:Date ,default:moment(new Date()).format('YYYY-MM-DD')},
    approvalStatus:{
        type:String,
        required:true,
        enum:['Pending','Under Review','Approved','Rejected'],
        default:'Pending'
    },
    approvedAt:{type:Date} 
});
module.exports = mongoose.model('leave',leaveSchema);