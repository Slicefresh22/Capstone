import axios from 'axios'
let preferenceItems = [];
let HomeEnvi = {};

const url = 'https://37vspy4wf0.execute-api.us-west-2.amazonaws.com/prod/capstone';
export const loadPrerence = async ()=> {
   const promise = await axios.get(url)
   return promise;
}

export const savePreference = async (data)=> {
    
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
      // console.log(HomeEnvi)
   }
   if(fieldName === 'humidity'){
      //console.log(feeds)
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