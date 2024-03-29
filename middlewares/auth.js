const { getUser } = require("../service/auth")


async function RestricttoLoginUseronly(req,res,next){
    
    const Usercid= req.cookies?.cid;

    if (!Usercid) return res.redirect("/login");
    const user = getUser(Usercid);

    if(!user) return res.redirect("/login"); 

    req.user = user;
    next();
}

async function Checkauth(req,res,next){
    const Usercid= req.cookies?.cid;    
    const user = getUser(Usercid);

    req.user = user;
    next();

}
module.exports = {RestricttoLoginUseronly,Checkauth}