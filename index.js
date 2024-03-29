const express  = require("express");
const mongoose = require("mongoose");
const urlRoute  = require("./routes/url");
const{connectToMongoDB}=require("./DB connection/connection");
const {RestricttoLoginUseronly,Checkauth} = require("./middlewares/auth")
const   URL  = require('./models/url');
const path = require("path");
const staticRouter = require('./routes/static');
const Userroute = require("./routes/user");
const cookieParser = require("cookie-parser");


const app = express();
const port= 8001;

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",RestricttoLoginUseronly,urlRoute);
app.use("/user",Userroute);
app.use("/",Checkauth,staticRouter);

app.get('/url/:shortId',async(req,res)=>{
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
