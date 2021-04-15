import axios from 'axios'
import { say, restartRecognition} from '../command/CommandControl';
import {responseMessage, itContainsGreetings, itContainsLightOn, itContainsLightOff, itContainsGeneric} from './responseData';
import {playSound} from '../audio/Audio'
let preferenceItems = [];
let HomeEnvi = {};
const url = 'https://37vspy4wf0.execute-api.us-west-2.amazonaws.com/prod/capstone';

export const loadPrerence = async ()=> {
   const promise = await axios.get(url)
   return promise;
}

export const savePreference = async(data) => {
   // only update if not empty 
   await data.forEach(item => {
      if(item.value !== '' || item.url !== null) {
         const data = {
            "id": parseInt(item.id),
            "url": item.value
         }
         console.log(data);
         axios.put(url, {
            body: data
         })
         .then(response => console.log(response))
         .catch(err => console.log(err));
      }
   })
}
export const getTemperature = async () => {
   let currentTemp = 0;
   let data = [];
   await loadPrerence().then(res => preferenceItems = res.data.Items)
   .catch(err => console.log(err)); 
   // getting the temp settings 
   data = findUrl(preferenceItems, 'temp'); // get the url for tem 
   const {url} = data[0];
   loadWeatherData(url).then(res => {
      const {feeds} = res.data; 
      const temperature = 'temperature';
      setHomeEnvi(feeds, 'field1', temperature, currentTemp); 
   })
   .catch(err => console.log(err));
   getHumidity();
}

const loadWeatherData = async (url) => {
   const promise = await axios.get(url, {
      method: 'POST'
   }); 
   return promise;
}

const getHumidity = () => {
   const data = findUrl(preferenceItems, 'humid'); 
   const {url} = data[0]; 
   let currentHimidity = 0; 
   loadWeatherData(url).then(res => {
      const {feeds} = res.data;
      setHomeEnvi(feeds, 'field2', 'humidity', currentHimidity); 
   })
   .catch(err => {
      console.log(err);
   })
}


const findUrl = (data, name) => {
   return data.filter(temp => temp.name === name);
}

const setHomeEnvi = (feeds, fliedNum, fieldName, currentVar) => {
   if(fieldName === 'temperature'){
      feeds.forEach(fee => {
         if(fee[`${fliedNum}`] != null){
            currentVar = fee[`${fliedNum}`];
         }
      });
      HomeEnvi = {...HomeEnvi, temperature: currentVar};
   }
   if(fieldName === 'humidity'){
      feeds.forEach(fee => {
         if(fee[`${fliedNum}`] != null){
            currentVar = fee[`${fliedNum}`];
         }
      });
      HomeEnvi = {...HomeEnvi, humidity: currentVar};
      // console.log(HomeEnvi)
   }
}
export const getHomeEnvi = () => {
   return HomeEnvi;
}

export const parseLightCommand = (command) => {
   let lightStatus = null;
   if(itContainsLightOn(command)) {
      lightStatus = 1;
   }
   if(itContainsLightOff(command)) {
      lightStatus = 0;
   }
   writeLightStatus(lightStatus);
}

const writeLightStatus = async (lightStatus) => {
   if(lightStatus != null){
      await axios.get(`https://api.thingspeak.com/update?api_key=0V9GIV8P3WZQRD4I&field1=${lightStatus}`)
      .then(res => {
         if(res.status === 200){
            playSound(0); // play alight switch sound  
         }
      })
      .catch(err =>{
         say(`An error has occurred, i could not perform that command.`); 
         console.log(err);
      });
   }
   else {
      say("Sorry, i'm not sure what you meant, please try again..."); // speaking 
   } 
}

export const commandSwitcher = (command) => {
   // contains the word temperature or humidity
   if(itContainsGeneric(command, 'temperature') || itContainsGeneric(command, 'humidity')){
      getTemperature();
      const data = getHomeEnvi();
      const message = responseMessage(data, '');
      say(message); // speaking 
   }
   // contains the word light 
   else if(itContainsGeneric(command, 'light')) {
      parseLightCommand(command);
   }
   // contains the wakeName
   else if(itContainsGeneric(command, 'wakename')) {
      say("Hello, I'm listening..."); 
   }
   else if(itContainsGreetings(command)){
      say("Hi");
      setTimeout(function(){
         say('What can i help you with?.')
      }, 2000);
      restartRecognition();
   }
   else {
      say("Hello");
      setTimeout(function(){
         say(`I'm not sure what you meant by: ${command}`);
         say('Please try saying or typing your command again.')
      }, 2000); 
   }
}

