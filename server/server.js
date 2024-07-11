const express=require('express');
require('dotenv').config();
const mongoose=require('mongoose');
const cors=require('cors')
const app=express();
app.use(express.json());
const intrestRouter=require('./routes/intrests');
const solutionRouter=require('./routes/solutions');
const userRouter=require('./routes/users');
const queryRouter=require('./routes/queries');
const proposalRouter=require('./routes/proposals');
const loanRouter=require('./routes/loans');
const ideaRouter=require('./routes/ideas');
app.use(cors({
    origin: `${process.env.HOST_ADDRESS}`,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
    credentials:true
  }));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `${process.env.HOST_ADDRESS}`);
    next();
  });
mongoose.connect(`${process.env.MONGO_URL}`)
.then(console.log("connected to mongodb"))
.catch(err=>console.log(err));
app.use('/intrest',intrestRouter);
app.use('/loan',loanRouter);
app.use('/proposal',proposalRouter);
app.use('/query',queryRouter);
app.use('/user',userRouter);
app.use('/idea',ideaRouter);
app.use('/solution',solutionRouter);
app.listen(4000,()=>{
    console.log('server is running on port 4000')
})