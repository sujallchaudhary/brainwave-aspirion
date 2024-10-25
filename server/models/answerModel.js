const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    quesId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
});

const Answer = mongoose.model('Answer', answerSchema);