const shortid = require("shortid")
const URL= require("../models/url"); 

async function handlegenarateShortURL(req,res){
    const body = req.body;
    if (!body.url) return res.status(400).json({error:"url is empty"})
    const shortId= shortid();

    await URL.create({
        shortId:shortId,
        RedirectURL:body.url,
        visitHistory:[],
    });

    return res.json({id:shortId});
} 

async function handleGetClicks(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        Clicks:result.VisitHistory.length,
        History:result.VisitHistory

    });
}

module.exports = {
    handlegenarateShortURL,
    handleGetClicks
}