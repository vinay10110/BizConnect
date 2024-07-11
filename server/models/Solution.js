const mongoose=require('mongoose');
const Solution=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:'User'
            },
            query:{
type:mongoose.Schema.Types.ObjectId,ref:'Query'
            },
    description:String
},{
    timestamps:true
})
const solution=mongoose.model('Solution',Solution);
module.exports=solution;