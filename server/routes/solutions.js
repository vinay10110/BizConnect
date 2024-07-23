const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const Solution=require('../models/Solution');
const Query=require('../models/Query');
const secret=process.env.SECRET;
router.post('/',(req,res)=>{
    const token=req.headers.authorization;
    const {queryId,description}=req.body;
    jwt.verify(token,secret,{},async(err,info)=>{
      try {
      await Solution.create({
          user:info.id,
          query:queryId,
          description
        })
        return res.status(201).json({message:'solution posted succesfully'})
      } catch (error) {
        console.log(error);
       return  res.status(500).json({message:'Internal server error'})
      }
    })
  })
  router.delete('/',(req,res)=>{
    const token=req.headers.authorization;
    const {id}=req.body;
   
    jwt.verify(token,secret,{},async(err,info)=>{
      try {
      await Solution.findByIdAndDelete(id)
        return res.status(201).json({message:'solution deleted succesfully'})
      } catch (error) {
        console.log(error);
       return  res.status(500).json({message:'Internal server error'})
      }
    })
  })
  router.get('/',async(req,res)=>{
    try {
      const solutionDoc=await Solution.find().populate('user').populate('query');
        if(!solutionDoc){
          return res.status(404).json({message:'solutions are empty'})
        }
        return res.json(solutionDoc);
    } catch (error) {
      console.log(error);
     return  res.status(500).json({message:'Internal server error'})
    }
  })
module.exports= router;