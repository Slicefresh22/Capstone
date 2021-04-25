import axios from 'axios'
import { say, restartRecognition} from '../command/CommandControl';
import {responseMessage, itContainsGreetings, itContainsFanOff, itContainsFanOn, 
   itContainsLightOn, itContainsLightOff, itContainsGeneric} from './responseData';
import {playSound} from '../audio/Audio'
let preferenceItems = [];
let HomeEnvi = {};
let home = {};
let tempUrl;
let humidUrl;
let lightOnOff = '';
let fanOnOff = '';
const url = 'https://37vspy4wf0.execute-api.us-west-2.amazonaws.com/prod/capstone';
const saveUrl = 'https://37vspy4wf0.execute-api.us-west-2.amazonaws.com/prod/saveCapstoneSettings';


export const loadPrerence = async ()=> {
   const promise = await axios.get(url)
   return promise;
}

export const savePreference = async(data) => {
   // only update if not empty 
   await data.forEach(item => {
      if(item.value){
         const data = {
            'id': item.id,
            'url': item.value
         }

         axios(saveUrl, {
            method: 'PUT', 
            body: JSON.stringify(data)
         })
         .then(res => console.log(res))
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
      await axios.post(`https://api.thingspeak.com/update?api_key=0V9GIV8P3WZQRD4I&field1=${lightStatus}`)
      .then(res => {
         if(res.status === 200){
            playSound(0); // play alight switch sound
            getLightStatus();
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

const fanCommandParser = (status) =>{
   if(status === 1){
      axios.get(`https://api.thingspeak.com/update?api_key=0V9GIV8P3WZQRD4I&field2=${status}`)
      .then(res => {
         if(res.status === 200){
            say('OK...i started the fan');
            getFanStatus();
         }
      })
      .catch(err => console.log(err));
   }
   if(status === 0){
      axios.get(`https://api.thingspeak.com/update?api_key=0V9GIV8P3WZQRD4I&field2=${status}`)
      .then(res => {
         if(res.status === 200){
            say('the fan is stopped');
            getFanStatus();
         }
      })
      .catch(err => console.log(err));
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
   else if(itContainsFanOff(command)){
      fanCommandParser(0); // send the off command
   }
   else if(itContainsFanOn(command)){
      fanCommandParser(1); // send the on command
   }
   else {
      say("Hello");
      setTimeout(function(){
         say(`I'm not sure what you meant by: ${command}`);
         say('Please try saying or typing your command again.')
      }, 2000); 
   }
}


export const getCurrentUser = () => {
   const idToken = JSON.parse(localStorage.getItem("okta-token-storage"));
   const {users_info} = idToken.accessToken.claims;
   return users_info;
}


const loadData = async () => {
   await loadPrerence().then(res => res)
   .then(res => {
      tempUrl =  res.data.Items[2].url;
      humidUrl = res.data.Items[1].url; 

      getWeatherData('temp', tempUrl);
      getWeatherData('', humidUrl); 
   })
}



const getWeatherData = async (cat, url) => {
   if(cat === 'temp'){
       await axios.get(url)
       .then(res => {
           const {feeds} = res.data;
           let temp = [];
           feeds.forEach(f => {
               if(parseInt(f.field1)){
                   temp.push(f.field1);
               }
            })
         
         // console.log(temp);
         home = {...home, averageTemp: calAvgtemp(temp)};
       })
       .catch(err => console.log(err));
   }
   else {
       await axios.get(url)
       .then(res => {
           const {feeds} = res.data;
           let humid = [];
           feeds.forEach(f => {
               if(parseInt(f.field2)){
                   humid.push(f.field2);
               }
           })

      home = {...home, averageHumid: calAvgtemp(humid)}

       })
       .catch(err => console.log(err));
   }
}

const calAvgtemp = (data) => {
   let sum = 0; 
   data.forEach(item => {
       sum += parseInt(item);
   })

   return Math.floor(sum / data.length);
}

export const getAverages = () => {
   loadData();
   return home;
}

const LightStatus = async () => {
   await axios.get(`https://api.thingspeak.com/channels/1348356/fields/1.json?api_key=MKK4AAYSXG0A4H02&results=1`)
   .then(res => {
      if(parseInt(res.data.feeds[0].field1) === 1) {
         lightOnOff = 'ON'; 
      }
      else {
         lightOnOff = 'OFF';
      }
   })
   .catch(err => console.log(err));
}

const fanStatus = async () => {
   await axios.get(`https://api.thingspeak.com/channels/1348356/fields/2.json?api_key=MKK4AAYSXG0A4H02&results=1`)
   .then(res => {
      if(parseInt(res.data.feeds[0].field2) === 1) {
         fanOnOff = 'ON'; 
      }
      else {
         fanOnOff = 'OFF';
      }
   })
   .catch(err => console.log(err));
}

export const getLightStatus = () => {
   LightStatus();
   return lightOnOff;
}

export const getFanStatus = () => {
   fanStatus();
   return fanOnOff;
}