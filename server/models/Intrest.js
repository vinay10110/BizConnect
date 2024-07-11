const mongoose=require('mongoose');
const Intrest=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
            },
    loan:{
        type:mongoose.Schema.Types.ObjectId,ref:'Loan'
    }
},{
    timestamps:true
})
const intrest=mongoose.model('Intrest',Intrest);
module.exports=intrest;