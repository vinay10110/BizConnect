const mongoose=require('mongoose');
const Loan=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
            },
    loanType:{
        type:[String]
    },
    minAge:Number,
    maxAge:Number,
    amount:Number,
    intrestRate:Number,
    duration:Number
},{
    timestamps:true
})
const postLoan=mongoose.model('Loan',Loan);
module.exports=postLoan;