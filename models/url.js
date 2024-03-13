const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    }, 
    RedirectURL:{
        type:String,
        required:true
    },
    VisitHistory:[{timestamp:{type:Number}}]

    
},{timestamps:true}
);

const URL = mongoose.model('url',userSchema);

module.exports= URL;