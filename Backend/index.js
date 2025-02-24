const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const cors = require("cors");
const validate = require("./middleware/validateMiddleware");
const authorize = require("./middleware/authMiddleware");
const RoleAuth = require("./middleware/roleAuthMiddleware");
const Employee = require("./models/employeeModel");
const { ManagersignupSchema } = require("./utils/validator");
const express = require("express");
const app = express();
const PORT = process.env.PORT;

const dbConnect = require("./utils/dbConnnect");
const adminRoute = require("./routes/AdminRoute");
const managerRoute = require("./routes/ManagerRoute");
const { mongoose } = require("mongoose");

app.use(express.json());
app.use(cors({
  origin:"*",
}));
app.use("/", adminRoute);
app.use("/", managerRoute);

dbConnect();
const db = mongoose.connection;
db.once("open", () => {
  console.log("database connnected");
});
db.on("error", (err) => {
  console.log("MongoDB connection error :", err);
});

app.post("/createEmployees", authorize,validate(ManagersignupSchema), async (req, res) => {
  try {
    const { user } = req.user;

    const { fullName, email, password, role } = req.body;

    const employees = await Employee.findOne({ fullName, email });

    console.log(employees);
    if (employees != null) {
      return res.status(400).json({
        message: "Employee already exists with that data",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const emp = Employee({
      fullName,
      email,
      password: hashedPassword,
      role,
      userId: user._id,
    });

    emp.save();

    res.status(201).json({
      message: "employee added successfully",
      emp,
    });
  } catch (error) {
    if (error.errorResponse.code == 11000) {
      return res.json({
        message: "Duplicate entries not possible",
      });
    }
    res.status(500).json({
      message: error,
    });
  }
});

app.get("/getallEmployees",authorize, RoleAuth("Admin"), async (req,res) => {
  const {user} = req.user;

  const getAllEmp = await Employee.find({}).select('-password ');
 

  if(!getAllEmp) return res.status(401);

  res.status(200).json({
      data: getAllEmp
  });
});

app.delete("/deleteEmployee/:id", authorize, async (req, res) => {
  try {
    const id = req.params.id;

    const employees = await Employee.findByIdAndDelete(id);

    console.log(employees);
    if (employees == null) {
      return res.status(400).json({
        message: "Employee data Not found",
      });
    }

    res.status(201).json({
      message: "employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`App started listening at http://localhost:${PORT}`);
});
