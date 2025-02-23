const express = require("express");
const validate = require("../middleware/validateMiddleware");
const User = require("../models/userModel");
const Employee = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authorize = require('../middleware/authMiddleware');
const RoleAuth = require("../middleware/roleAuthMiddleware");
const { signupSchema, signinSchema } = require("../utils/validator");
const adminRoute = express.Router();

adminRoute.post("/adminsignup",validate(signupSchema), async (req, res) => {
    try {
      const { fullName, email, password, role } = req.body;
      
      if(role != "Admin"){
        return res.json({
            message: "Only admin can register"
        })
      }
  
      const existingUser = await User.findOne({ email: email });
      
      if (existingUser?.email == email && existingUser?.fullName == fullName) {
          return res.json({
              message: "User Already exists!",
          });
      }
   
      const hashedPassword = await bcrypt.hash(password,10);
    
  
      const user = new User({
        fullName,
        email,
        password:hashedPassword,
        role,
      });
  
      await user.save();
  
      res.status(201).json({
        message: "Registration Successful",
        userId: user._id,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });

adminRoute.post("/adminsignin",validate(signinSchema), async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if(role != "Admin"){
            return res.json({
                message: "Only Admin can login"
            })
          }

        const existingUser = await User.findOne({ email: email });

        if(!existingUser) {
            return res.json({
                message: "User not found! signup first",
            })
        }

        if (existingUser?.role != "Admin") {
            return res
              .status(401)
              .json({ message: "Unauthorized Access! Only Admins allowed" });
          }

        const response = await bcrypt.compare(password,existingUser.password);

        if(!response) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }
        
        let accestoken;
        if (existingUser?.email == email) {
             accestoken = jwt.sign({user: existingUser}, process.env.JWT_AUTH_SECRET_KEY,{
                expiresIn: "7d"
            });  
            console.log(accestoken);
        }
        
        res.status(200).json({
            message: "Signin Successful",
            accestoken
          });

    }catch(error) {
        if(error.errorResponse.code == 11000){
            return res.json({
                message: "Duplicate entries not possible"
            })
        }
        res.status(500).json({
            message: "Internal server error",
        })
    }

});

adminRoute.get("/getadminInfo",authorize, RoleAuth("Admin"), async (req,res) => {
    const {user} = req.user;

    const getInfo = await User.findOne({_id:user._id});

    if(!getInfo) return res.status(401);

    res.status(200).json({
        fullName:getInfo.fullName,
        email: getInfo.email,
        role: getInfo.role,
        message: "admin Info"
    });
});

adminRoute.get("/getallAdminEmployee",authorize, RoleAuth("Admin"), async (req,res) => {
    const {user} = req.user;

    const getadminemp = await Employee.find({role: {$in: ["Manager","Employee"]}, userId:user._id }).populate("userId").select('-password ');
    const filteredData = getadminemp.filter(data => data.userId.role == "Admin");

    if(!getadminemp) return res.status(401);

    res.status(200).json({
        data: filteredData
    });
});



module.exports = adminRoute;