const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const Idea=require('../models/Idea');
const User=require('../models/User')
const secret=process.env.SECRET;
router.post('/',(req,res)=>{
    const token=req.headers.authorization;
    const {title,
      category,
      companyReg,
      projectLife,
      experience,
      skillSet,
      description,
    }=req.body;
      jwt.verify(token,secret,{},async(err,info)=>{
        const id=info.id;
        try {
          await Idea.create({
           user:id,
            title,
        category,
        companyReg,
        projectLife,
        experience,
        skillSet,
        description
          })
        return  res.status(201).json({message:'Posted succesful'});
        } catch (error) {
          console.log(error);
        return  res.status(500).json({message:'Internal server error'});
        }
      })
  })

  router.get('/',async(req,res)=>{
   try {
    const postDoc=await Idea.find().populate('user');
    if(!postDoc){
      return res.status(404).json({message:'ideas are empty'})
    }
    res.json(postDoc);
   } catch (error) {
    console.log(error);
   return  res.status(404).json({message:'error while getting the docs'})
   }
  })
  router.put('/',(req,res)=>{
    const token=req.headers.authorization;
    const {values,id
    }=req.body;
    const {title,
      category,
      companyReg,
      projectLife,
      experience,
      skillSet,
      description,
    }=values;

    jwt.verify(token,secret,{},async(err,info)=>{
      try {
        await Idea.findByIdAndUpdate(id,{
          title,
      category,
      companyReg,
      projectLife,
      experience,
      skillSet,
      description,
        })
        return res.status(202).json({message:'Idea updated succesfully'})
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
        await Idea.findByIdAndDelete(id.id);
        return res.status(200).json({message:'idea deleted succesfully'})
      } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'})
      }
    })
  })
module.exports=router