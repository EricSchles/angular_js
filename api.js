var express = require("express");

var app = express();

app.get("/api",function(req,res){
    res.send({name:"Eric Schles",email:"eric.schles@syncano.com"})
});

app.get("/viewer",function(req,res){
  res.sendfile("./viewer.html");
});
app.listen(5000);
console.log("running");
