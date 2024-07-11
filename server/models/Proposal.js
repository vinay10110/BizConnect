const mongoose=require('mongoose');
const Proposal=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
            },
    investmentType:String,
    investmentCategory:String,
    expectedRevenue:Number,
    amount:Number,
    skillSet:String,
    experience:Number
},{
    timestamps:true
})
const proposal=mongoose.model('Proposal',Proposal);
module.exports=proposal;