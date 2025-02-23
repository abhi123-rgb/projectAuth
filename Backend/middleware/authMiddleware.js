const jwt = require("jsonwebtoken");

function authorize(req,res,next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token)  return res.sendStatus(401);

    jwt.verify(token,process.env.JWT_AUTH_SECRET_KEY, (err,user) => {
        if(err) return res.sendStatus(401);
        console.log(user);
        req.user = user;
        next();
    })

}

module.exports = authorize;