const mongoose=require('mongoose');
const Query=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
            },
    category:String,
    description:String
},{
    timestamps:true
})
const askQuery=mongoose.model('Query',Query);
module.exports=askQuery;