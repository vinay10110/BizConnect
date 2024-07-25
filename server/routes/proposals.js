const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const Proposal=require('../models/Proposal');
const proposal = require('../models/Proposal');
const secret=process.env.SECRET;
router.post('/',(req,res)=>{
    const token=req.headers.authorization;
    const {investmentType,expectedRevenue,amount,skillSet,experience,description}=req.body;
    jwt.verify(token,secret,{},async(err,info)=>{
    try {
      await Proposal.create({
        user:info.id,
        investmentType,
        expectedRevenue,
        amount,
        skillSet,
        experience,
        description
      })
      return res.status(201).json({message:'proposal posted succesfully'});
    } catch (error) {
      console.log(error);
     return  res.status(404).json({message:'error while posting proposal'})
    }
    })
  })
  router.get('/',async(req,res)=>{
    try {
      const proposalDoc=await Proposal.find().populate('user');
      if(!proposalDoc){
      return  res.status(404).json({message:'no proposals'})
      }
     return res.json(proposalDoc);
    } catch (error) {
      console.log(error);
     return res.status(500).json({message:'Internal server error'})
    }
  })
  router.put('/',(req,res)=>{
    const token=req.headers.authorization;
    const {id,values}=req.body;
    const {investmentType,expectedRevenue,amount,skillSet,experience,description}=values;
    jwt.verify(token,secret,{},async(err,info)=>{
      try {
        await Proposal.findByIdAndUpdate(id,{
          investmentType,
          expectedRevenue,
          amount,
          skillSet,
          experience,
          description
        })
        return res.status(202).json({message:'Proposal updated succesfully'})
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
        await proposal.findByIdAndDelete(id.id);
        return res.status(200).json({message:'Proposal deleted succesfully'})
      } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'})
      }
    })
  })
module.exports= router;