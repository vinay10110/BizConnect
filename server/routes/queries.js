const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const Query=require('../models/Query');
const Solution=require('../models/Solution');
const secret=process.env.SECRET;
router.post('/',(req,res)=>{
    const token=req.headers.authorization;
    const {category,description}=req.body;
    jwt.verify(token,secret,{},async(err,info)=>{
      if(err){
        console.log(err);
      }
      try {
        await Query.create({
              user:info.id,
              category,
              description
        })
       return res.status(201).json({message:'query created succesfully'})
      } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'});
      }
    })
  })
  router.get('/',async(req,res)=>{
    try {
      const queriesWithSolutions = await Solution.find().distinct('query');
      const queries = await Query.find({ _id: { $nin: queriesWithSolutions } }).populate('user', 'name email');
     return  res.json(queries);
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:'Internal server error'})
    }
  })
module.exports=router;