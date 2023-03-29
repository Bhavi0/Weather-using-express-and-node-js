const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');

// const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname+'/index.html');
});

app.post('/',  function(req, res){
  console.log(req.body.city_name);
  const query =  req.body.city_name;
  const apikey = '58b54f328436975d26572e1d9531a795';
  const unit = 'metric';
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apikey+'&units='+unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on('data', function(data){
    const weather_data =  JSON.parse(data);

    const temp = weather_data.main.temp;
    const description = weather_data.weather[0].description;
    const icon = weather_data.weather[0].icon;
    const image = 'https://openweathermap.org/img/wn/'+ icon +'@2x.png';

    res.write("<h1>The temprature in "+query+" is "+ temp+" degree celcius </h1>\n")
    res.write( "<h1>The weather is currently "+description+"</h1>");
    res.write("<img src='"+image+"' >");
    res.send();
    });
  });
})

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
