const apiKey ="a7cbb97f5c95d2142229b9de277746d7";
var rq = require('request');
const {WebhookClient, Card} = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))

process.env.DEBUG = 'dialogflow:*';

app.post('/webhook', function(request,response){
  const agent = new WebhookClient ({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  
 function humidity( agent) {
    var cityContext = agent.context.get(`citycontext`);
      console.log('humidity context is ',cityContext)
      var cityName;
      if (agent.parameters.geoCity){
        cityName = agent.parameters['geoCity'];
      }else if(cityContext.parameters['geoCity']){
        cityName = cityContext.parameters['geoCity'];
      }else{
        console.log(`City name is not provided`);
        agent.add(`please mention city name `);
      }
      return new Promise ((resolved , reject )=>{ 
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
       rq(url, function (error,_response, body ){
        if (error){
          console.log(`Error while calling api`);
          agent.add(`Something went wrong while getting the information from External source`);
          reject();
        }
        let weather  = JSON.parse(body);
        console.log('whether is: \n ' + weather);
        agent.context.set({
          'name':'citycontext',
          'lifespan': 5,
          'parameters': cityContext.parameters,
        });
        agent.add(new Card ({
          title : `Humidity Update`,
          imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwFfMsIQfjNUeY2QlP7bh9rT2HpXWwHQkRm_pv73oC7AePtidMkA`,
          text : `The humidity in ${cityName} is ${weather.main.humidity} `,
          buttonText: `this is a button`,
          buttonUrl:`button url`
          })
        );
        resolved();
      });
    })
 }
 function rain(agent){
  var cityContext = agent.context.get(`citycontext`);
      console.log('rain context is ',cityContext)
      var cityName;
      if (agent.parameters.geoCity){
        cityName = agent.parameters['geoCity'];
      }else if(cityContext.parameters['geoCity']){
        cityName = cityContext.parameters['geoCity'];
      }else{
        console.log(`City name is not provided`);
        agent.add(`please mention city name `);
      }
      return new Promise ((resolved , reject )=>{ 
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
       rq(url, function (error,_response, body ){
        if (error){
          console.log(`Error while calling api`);
          agent.add(`Something went wrong while getting the information from External source`);
          reject();
        }
        let weather  = JSON.parse(body);
        console.log('whether is: \n ' + weather);
        agent.context.set({
          'name':'citycontext',
          'lifespan': 5,
          'parameters':cityContext.parameters,
        });
        agent.add(new Card ({
          title : `Rain Update`,
          imageUrl: `http://weather.smh.com.au/styles/icons/fairfax/large/possible_shower.png?1480640737`,
          text :  (!(weather.rain)) ? "The rain is not expected in " + cityName : "The rainfall in Last 3 hours is " + weather.rain["3h"] + "mm",
          buttonText: `this is a button`,
          buttonUrl:`button url`
          })
        );
        resolved();
      });
    })
 }
  
 function weather(agent){
      var cityContext = agent.context.get(`citycontext`);
      console.log(' weather context is ',cityContext)
      var cityName;
      if (agent.parameters.geoCity){
        cityName = agent.parameters['geoCity'];
      }else if(cityContext.parameters['geoCity']){
        cityName = cityContext.parameters['geoCity'];
      }else{
        console.log(`City name is not provided`);
        agent.add(`please mention city name `);
      }
      return new Promise ((resolved , reject )=>{ 
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
       rq(url, function (error,_response, body ){
        if (error){
          console.log(`Error while calling api`);
          agent.add(`Something went wrong while getting the information from External source`);
          reject();
        }
        let weather  = JSON.parse(body);
        let jdescription= weather.weather[0].description;
        console.log('whether is: \n ' + weather);
        agent.context.set({
          'name':'citycontext',
          'lifespan': 5,
          'parameters':cityContext.parameters
        });
        agent.add(new Card ({
          title : `Whether Update`,
          imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqgV7ULWjc32FYJQqOIyrWA-W8NP8qzkjiBkQnD4uVNdsRXziYw`,
          text : `The weather in ${cityName} is ${jdescription} `,
          buttonText: `this is a button`,
          buttonUrl:`button url`
          })
        );
        resolved();
      });
    })
 }

 function temperature(agent){
  var cityContext = agent.context.get(`citycontext`);
      console.log('temperature context is ',cityContext)
      var cityName;
      if (agent.parameters.geoCity){
        cityName = agent.parameters['geoCity'];
      }else if(cityContext.parameters['geoCity']){
        cityName = cityContext.parameters['geoCity'];
      }else{
        console.log(`City name is not provided`);
        agent.add(`please mention city name `);
      }
      return new Promise ((resolved , reject )=>{ 
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
       rq(url, function (error,_response, body ){
        if (error){
          console.log(`Error while calling api`);
          agent.add(`Something went wrong while getting the information from External source`);
          reject();
        }
        let weather  = JSON.parse(body);
        console.log('whether is: \n ' + weather);
        agent.context.set({
          'name':'citycontext',
          'lifespan': 5,
          'parameters':cityContext.parameters
        });
        agent.add(new Card ({
          title : `Temperature Update`,
          imageUrl: `http://weather.smh.com.au/styles/icons/fairfax/large/mostly_sunny.png?1480640735`,
          text : `The temperature in ${cityName} is ${weather.main.temp} `,
          buttonText: `this is a button`,
          buttonUrl:`button url`
          })
        );
        resolved();
      });
    })
 }

 function wind(agent){
  var cityContext = agent.context.get(`citycontext`);
      console.log('wind context is ',cityContext)
      var cityName;
      if (agent.parameters.geoCity){
        cityName = agent.parameters['geoCity'];
      }else if(cityContext.parameters['geoCity']){
        cityName = cityContext.parameters['geoCity'];
      }else{
        console.log(`City name is not provided`);
        agent.add(`please mention city name `);
      }
      return new Promise ((resolved , reject )=>{ 
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
       rq(url, function (error,_response, body ){
        if (error){
          console.log(`Error while calling api`);
          agent.add(`Something went wrong while getting the information from External source`);
          reject();
        }
        let weather  = JSON.parse(body);
        console.log('whether is: \n ' + weather);
        agent.context.set({
          'name':'citycontext',
          'lifespan': 5,
          'parameters':cityContext.parameters
        });
        agent.add(new Card ({
          title : `Wind Update`,
          imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpItHWtCzBe7XloA1s2uD66uY3iMRNlvNFO5Y66_Pn6VWMc94O`,
          text : `The wind speed in ${cityName} is ${weather.wind.speed} m/s with ${weather.wind.deg} degrees! `,
          buttonText: `this is a button`,
          buttonUrl:`button url`
          })
        );
        resolved();
      });
    })
 }



 let intentMap = new Map();
 intentMap.set(`humidity`, humidity);
 intentMap.set(`rain`, rain);
 intentMap.set(`weather`, weather);
 intentMap.set(`temperature`, temperature);
 intentMap.set(`wind`, wind);

 agent.handleRequest(intentMap);
})

app.listen( port, ()=>{ console.log(`Server is running at ${port}`) } );
