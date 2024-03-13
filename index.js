const express  = require("express");
const mongoose = require("mongoose");
const urlRoute  = require("./routes/url");
const{connectToMongoDB}=require("./DB connection/connection")
const   URL  = require('./models/url');

const app = express();
const port= 8001;

app.use(express.json());
app.use("/url",urlRoute);

app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    },
    { $push:{
        VisitHistory:{
            timestamp:Date.now()
        }
    } });
    res.redirect(entry.RedirectURL);

})


connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=>console.log("MongoDB Connected"));

app.listen(port,()=>console.log("Server Started!"));
