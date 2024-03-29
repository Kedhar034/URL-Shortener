// this service folder is created because  
// to  store the sessionid which the user object, to k n ow about  which session id(cookie) belongs to which user 
// it simply represents state in statefull authentication
//const sessionIdtoUsermap= new Map();--> represents state in statefull authentication;

const jwt = require("jsonwebtoken");
const secret = "Kedhar@1234567";


function setUser(user){
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },secret);
}
function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    } catch(error){
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}