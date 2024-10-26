const { submitQuery } = require('../utils/model');
const Answer = require('../models/answerModel');
const responseModel = require('../models/responseModel');


const getResponse = async (req, res) => {
    try{
        const answers = await Answer.findOne({userId:req.body._id});
        const answerObject = JSON.stringify(answers.answer[0]);
        const query = `Given the individual's profile:${answerObject}Recommend a suitable career path and explain why.`;
        if(!answers){
            return res.status(404).json({success:false,status:404,message:"No answers found",data:null});
        }
        const response = await submitQuery(query);
        if(!response){
            return res.status(404).json({success:false,status:404,message:"No response found",data:null});
        }
        const responseData= await responseModel.create({userId:req.body._id,response});
        if(!responseData){
            return res.status(404).json({success:false,status:404,message:"response Not Saved.",data:null});
        }
        return res.status(200).json({success:true,status:200,message:"Response fetched successfully",data:responseData});

    }
    catch(error){
        return res.status(500).json({success:false,status:500,message:'Internal Server error'+error,data:null});
    } 
};

module.exports = { getResponse };