const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const app = express();

mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected");
})
.catch((err) => console.log(err));

app.listen(8800, () => {
    console.log("Backend server is running!")
});