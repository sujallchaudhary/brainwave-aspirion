const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText:{
        type:String,
        required:true,
        trim:true,
    },
    type:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    explanation:{
        type:String,
        required:true,
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;