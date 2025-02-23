function RoleAuth(allowedRoles) {
    return function(req,res,next) {
        const { user } = req.user;
        console.log(user.role);
        if(!allowedRoles.includes(user.role)){
            return res.status(403).json({message: " Access Denied!"});
        }
        next();
    }
}

module.exports = RoleAuth;