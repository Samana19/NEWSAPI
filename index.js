require('dotenv').config();

const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

//see static flder
app.use(express.static(path.join(__dirname, "/")));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/auth"));
app.use("/api/news", require("./routes/api/news"));
// app.use("/api/article", require("./routes/api/article"));



app.use((err,req,res,next)=>{
  console.log(err)
  if(err.username=== 'CastError'){
      res.status(400)
  }else if(err.username =="ValidationError"){
      res.status(400)
  }
  res.json({error: err.message})
})

//starts express server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const PORT = process.env.PORT || 3000;
