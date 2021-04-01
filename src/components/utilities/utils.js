import axios from 'axios'

const url = 'https://37vspy4wf0.execute-api.us-west-2.amazonaws.com/prod/capstone';
export const loadPrerence = async ()=> {
   return await axios.get(url); 
}

export const savePreference = async (data)=> {
    
}