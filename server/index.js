const express=require('express');
require('dotenv').config();
const cors = require('cors');
const connection = require('./database/connection');

const app=express();
connection();

const authRoute=require('./routes/authRoute');
const userRoute=require('./routes/userRoute');
const questionRoute=require('./routes/questionRoute');
const answerRoute=require('./routes/answerRoute');
const optionRoute = require('./routes/optionRoute'); 
const modelRoute = require('./routes/modelRoute');

app.get('/',(req,res)=>{
    res.json({success:true,status:200,message:"brAInWave API is running...",data:null});
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/question',questionRoute);
app.use('/answer',answerRoute);
app.use('/option', optionRoute);
app.use('/model',modelRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at  http://localhost:${process.env.PORT}`);
});