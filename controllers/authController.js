const User=require("../models/User");

const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");

const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message:"User already exists"
            });
        }
        const hashedpassword=await bcrypt.hash(password,10);

        await User.create({
            name,
            email,
            password:hashedpassword
        });

        res.status(201).json({
            message:"User registered successfully"
        });
    } catch (error) {
        return res.status(500).json({message:"Server error"});
    }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax", 
      secure: false,  
      maxAge: 24 * 60 * 60 * 1000
    });


    res.status(200).json({
      message: "Login successful",
      role:user.role
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports={registerUser,loginUser};