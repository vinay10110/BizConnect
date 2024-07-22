const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const Intrest=require('../models/Intrest');
const secret=process.env.SECRET;
router.post('/',(req,res)=>{
    const token=req.headers.authorization;
  const id=req.body;
  jwt.verify(token,secret,{},async(err,info)=>{
    if(err){
      console.log(err);
    }
    try {
      await Intrest.create({
       user:info.id,
       loan:id.ID,
      })
      return res.status(201).json({message:'intrest posted succesfully'})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:'Internal server error'})
    }
  })
   })
   router.delete('/',(req,res)=>{
    const token=req.headers.authorization;
  const id=req.body;
 
  jwt.verify(token,secret,{},async(err,info)=>{
    if(err){
      console.log(err);
    }
    try {
      await Intrest.findByIdAndDelete(id.id)
      return res.status(201).json({message:'intrest canceld succesfully'})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:'Internal server error'})
    }
  })
   })
  router.get('/',async(req,res)=>{
    try {
      const intrestDoc=await Intrest.find().populate('loan').populate('user');
      if(!intrestDoc){
        return res.status(404).json({message:'no intrest found'});
      }
     return  res.json(intrestDoc);
    } catch (error) {
      console.log(error);
     return res.status(500).json({message:'error while getting the intrested users'})
    }
  })
module.exports= router;