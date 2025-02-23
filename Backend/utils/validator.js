const { z } = require("zod");

const signupSchema = z.object({
  fullName: z
    .string({ required_error: "fullName is required" })
    .trim()
    .min(4, { message: "fullName must be atleast of 4 characters" })
    .max(200, { message: "fullName must not be more than 200 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .email({ message: "Invalid Email address" })
    .min(5, { message: "Email must be atleast of 5 characters" })
    .max(60, { message: "Email must not be more than 60 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    })
    .min(8, { message: "Password must be atleast of 8 characters" })
    .max(200, { message: "Password must not be more than 200 characters" }),
  role: z.string({ required_error: "Role is required" }),
});

const signinSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .email({ message: "Invalid Email address" })
    .min(5, { message: "Email must be atleast of 5 characters" })
    .max(60, { message: "Email must not be more than 60 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast of 8 characters" })
    .max(200, { message: "Password must not be more than 200 characters" }),
  role: z.string({ required_error: "Role is required" }),
});

module.exports = {
  signupSchema,
  signinSchema,
};
