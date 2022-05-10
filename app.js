const mongoose = require("mongoose");
const express = require("express");
const url = 'mongodb://localhost/productMulter'
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer')


//My routes
const productRoutes = require("./routes/product");

//DB Connection
mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(express.json());

//My Routes
app.use("/api", productRoutes);

//Starting a server
app.listen(3000, () => {
    console.log(`server started`);
});