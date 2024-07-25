const mongoose =require('mongoose');
const Idea=new mongoose.Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,ref:'User'
    },
    title:String,
    category:{
        type:[String]
    },
    companyReg:Number,
    projectLife:Number,
    experience:Number,
    skillSet:String,
    description:String,
},{
    timestamps:true
})
const postIdea=mongoose.model('Idea',Idea);
module.exports=postIdea;