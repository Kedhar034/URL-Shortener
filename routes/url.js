const  express= require("express");
const {handlegenarateShortURL,handleGetClicks} = require("../controllers/url")

const router = express.Router();

router.post('/',handlegenarateShortURL);

router.get('/clicks/:shortId',handleGetClicks);


module.exports=router;