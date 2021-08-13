const express = require("express");
const userRoutes = require("./routes/auth")
const orderRoutes = require("./routes/order");
const ingRoutes = require("./routes/ingredients");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");


const app = express();
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use("/users",userRoutes);
app.use("/order",orderRoutes);
app.use("/ings",ingRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const errorData = error.data;

  res.status(status).json({ message: message, errorData: errorData , err:error});
  console.log(res.error);
  
});

mongoose.connect("mongodb+srv://Araraef22:P3MOglMyOqwXvgX1@cluster0.fwsyw.mongodb.net/burgerBuilderDatabase")
.then(res=>{
    app.listen(8080);})
.catch(err=>{
    console.log(err);});
