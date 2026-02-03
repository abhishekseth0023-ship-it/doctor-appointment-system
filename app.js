const express=require("express");

const cookieParser=require("cookie-parser");

const authRoutes=require("./routes/authRoutes");

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use("/auth",authRoutes);

const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/appointments", appointmentRoutes);


app.get("/",(req,res)=>{
    res.send("Doctor Appointment System running")
});

module.exports=app;