// const express = require('express');
import express from "express";
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require("path");

app.use(express.json());

// Body Parser Middlewear:
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "client/build")));
// app.use(methodOverride("_method"));
// app.use(flash());

app.use("/", function(req, res){
    res.send("hello world");
});

// DB config
var url = process.env.DATABASEURL|| "mongodb://localhost:27017/moviego"
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', _ => {
    console.log('DB connected...', url);
});
db.on('error', err => {
    console.error('DB connection error:', err);
});

// Port config
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server has started...!");
});
