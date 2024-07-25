const mongoose=require('mongoose');
const Proposal=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
            },
    investmentType:{
        type:[String]
    },
    expectedRevenue:Number,
    amount:Number,
    skillSet:String,
    experience:Number,
    description:String
},{
    timestamps:true
})
const proposal=mongoose.model('Proposal',Proposal);
module.exports=proposal;