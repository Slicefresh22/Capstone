import axios from 'axios'
var preferenceItems = [];

const url = 'https://37vspy4wf0.execute-api.us-west-2.amazonaws.com/prod/capstone';
export const loadPrerence = async ()=> {
   const promise = await axios.get(url)
   return promise;
}

export const savePreference = async (data)=> {
    
}

export const getTemperature = async () => {
   await loadPrerence().then(res => preferenceItems = res.data.Items)
   .catch(err => console.log(err)); 
   
   // getting the temp settings 
   const temp = preferenceItems.filter(temp => temp.name == 'temp');
   const {url, name, alias} = temp[0];

   loadTemperature(url).then(res => console.log(res))
   .catch(err => console.log(err));
}


const loadTemperature = async (url) => {
   const promise = await axios.get(url, {
      method: 'POST'
   }); 
   return promise;
}

