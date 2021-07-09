// jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app= express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
      res.sendFile(__dirname +"/index.html");
    });
    app.post("/",function(req,res){
      const query=req.body.cityName;
      const apikey="691bc5ff36ff1141c04d9e1f2a132615";
      const unit="metric";
      const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
      https.get(url,function(response){
          response.on("data",function(data){
          const weatherData = JSON.parse(data);
          const icon=weatherData.weather[0].icon;
          const image="http://openweathermap.org/img/wn/"+icon+"@2x.png";
          const temp= weatherData.main.temp;
          const weatherDescription=weatherData.weather[0].description;
          res.write("<h1 style='color:#150E56;font-family:cursive; margin-top:200px'><center>The Temperature in "+query+" is "+ temp +" degree Celsius</center></h1>");
          res.write("<h2 style='color:#150E56;font-family:cursive; margin-top:0px'><center>The weather is currently "+ weatherDescription+"</center></h2>");
          res.write("<center><img src="+image+"></center>");
          res.write("<body style='background-color:#E4FBFF'></body>");
          res.send();
    });
  });
    });
app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
