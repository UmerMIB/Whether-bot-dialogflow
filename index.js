const apiKey = process.env.apiKey;
const request = require('request');
const request = require ('require');
const {WebhookClient} = require('dialogflow-fulfillment');
const express = require(' express ');
const bodyParser = require('body-parser');
const app = express.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

process.env.DEBUG = 'dialogflow:debug';

app.post('/webhook', function(request,response){
    const _agent = new WebhookClient ({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
    function showWhether ( agent ){
        let cityName  = agent.parameters.address;
        return new Promise ( ( resolve , reject ) =>{

            request(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},uk&appid=${apiKey}`,(error, response, body){
                if (!error) {
                    
                }
            })
            
        })
    }
})
