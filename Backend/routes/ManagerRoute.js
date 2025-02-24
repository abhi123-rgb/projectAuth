require('dotenv').config();
const express = require("express");
const Employee = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ManagersignupSchema, signinSchema } = require("../utils/validator");
const validate = require("../middleware/validateMiddleware");
const authorize = require('../middleware/authMiddleware');
const RoleAuth = require("../middleware/roleAuthMiddleware");
const managerRoute = express.Router();

managerRoute.post("/managersignup",validate(ManagersignupSchema), async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;


    if(role != "Manager"){
        return res.json({
            message: "Only Managers can register"
        })
      }

    const existingUser = await Employee.findOne({ email: email });
    
    if (existingUser) {
        return res.json({
            message: "User Already exists!",
        });
    }
 
    const hashedPassword = await bcrypt.hash(password,10);
  

    const user = new Employee({
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
    console.log(error)
    if(error.errorResponse.code == 11000){
        return res.json({
            message: "Duplicate entries not possible"
        })
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

managerRoute.post("/managersignin",validate(signinSchema), async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if(role != "Manager"){
            return res.json({
                message: "Only Managers can login"
            })
          }

        const existingUser = await Employee.findOne({ email: email });

        if(!existingUser) {
            return res.json({
                message: "User not found! signup first",
            })
        }

        if (existingUser?.role != "Manager") {
            return res
              .status(401)
              .json({ message: "Unauthorized Access! Only Managers allowed" });
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
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        })
    }

});

managerRoute.get("/getmanagerInfo",authorize,RoleAuth("Manager"),async (req,res) => {
    const {user} = req.user;

    const getInfo = await Employee.findOne({_id:user._id});

    if(!getInfo) return res.status(401);

    res.status(200).json({
        fullName:getInfo.fullName,
        email: getInfo.email,
        role: getInfo.role,
        message: "manager Info"
    });
});

managerRoute.get("/getallManagerEmployee",authorize, RoleAuth("Manager"), async (req,res) => {
    const {user} = req.user;
    const getmanageremp = await Employee.find({role: "Employee", userId:user._id }).select('-password ');

    // const filteredData = getmanageremp.filter(data => data.userId.role == "Manager");

    if(!getmanageremp) return res.status(401);

    res.status(200).json({
        data: getmanageremp 
    });
});




module.exports = managerRoute;
