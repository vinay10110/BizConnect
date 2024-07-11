const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const Loan=require('../models/Loan');
const secret=process.env.SECRET;
router.post('/',(req,res)=>{
    const token=req.headers.authorization;
    const {loanType,minAge,maxAge,netIncome,intrestRate,duration}=req.body;
   jwt.verify(token,secret,{},async(err,info)=>{
    try {
      await Loan.create({
        user:info.id,
        loanType,
        minAge,
        maxAge,
        netIncome,
        intrestRate,
        duration
      });
      return res.status(201).json({message:'loan created'})
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:'Internal server error'});
    }
   })
  })
  router.get('/',async(req,res)=>{
    try {
      const loanDoc=await Loan.find().populate('user');
      if(!loanDoc){
       return  res.json({message:'loans are empty'})
      }
     return  res.json(loanDoc);
    } catch (error) {
      console.log(error);
     return  res.json(404).json({message:'error while getting loans'})
    }
  })
  router.put('/',(req,res)=>{
    const token=req.headers.authorization;
    const {id,values}=req.body;
    const {loanType,minAge,maxAge,netIncome,intrestRate,duration}=values;
    jwt.verify(token,secret,{},async(err,info)=>{
      try {
        await Loan.findByIdAndUpdate(id,{
          loanType,
          minAge,
          maxAge,
          netIncome,
          intrestRate,
          duration
        })
        return res.status(202).json({message:'Loan updated succesfully'})
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
      try {
        await Loan.findByIdAndDelete(id.id);
        return res.status(200).json({message:'Loan deleted succesfully'})
      } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'})
      }
    })
  })
module.exports=router;