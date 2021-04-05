import axios from 'axios'
import { say } from '../command/CommandControl';
let preferenceItems = [];
let HomeEnvi = {};
const url = 'https://37vspy4wf0.execute-api.us-west-2.amazonaws.com/prod/capstone';

export const loadPrerence = async ()=> {
   const promise = await axios.get(url)
   return promise;
}

export const savePreference = async(data) => {
   // only update if not empty 
   await data.map(item => {
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
   const lightOn = 'light on';
   const lightOn2 = 'turn on the light';
   const lightOn3 = 'turn the light on';
   const lightOff = 'light off';
   const lightOff2 = 'turn off the light';
   const lightOff3 = 'turn the light off';

   if(parseReExp(lightOn).test(command) || parseReExp(lightOn2).test(command) || parseReExp(lightOn3).test(command)) {
      lightStatus = 1;
   }

   if(parseReExp(lightOff).test(command) || parseReExp(lightOff2).test(command) || parseReExp(lightOff3).test(command)) {
      lightStatus = 0;
   }

   writeLightStatus(lightStatus);
}

// parins command cheking for matchin key words
const parseReExp = (phrase) => {
  return new RegExp('\\b' + phrase + '\\b');
}

const writeLightStatus = async (lightStatus) => {
   console.log(lightStatus);
   if(lightStatus != null){
      const field = 'field3';
      await axios.get(`https://api.thingspeak.com/update?api_key=P0CY7LTP925HD9R2&field1=${lightStatus}`)
      .then(res => {
         if(res.status == 200){
            say('Okay'); // speaking 
         }
      })
      .catch(err => console.log(err));
   }
   else {
      say("Sorry, I didn't get that. Please try again...");
   } 
}
