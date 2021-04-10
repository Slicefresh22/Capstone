import { v4 as uuidv4 } from 'uuid';
import {parseReExp} from '../utilities/utils'

var responseHistory = []; 
const greetingsPhrase = [ 'Hello there', 'hello', 'Hello', 'Hi', 'hi', 'goodmorning', 'hey', 'Hey']; 

export const responseMessage = (data, topic = '')=> {
    const {temperature, humidity} = data;
    var randomMessage = [];
    var history = {};

    switch(topic){
        case 'temperature':
            // do somethings here
            randomMessage = [
                `Right now, the temerature is ${temperature} degrees fahrenheit`, 
                `At your current location, the temperature is ${temperature} degrees fahrenheit, as of ${getTimeAndDate()}`,
                `${temperature} degrees fahrenheit, is the current temperature at your location`
            ]
            history = {
                id: generateId(),
                time: getTimeAndDate(), 
                data: `Temperature: ${temperature}°F`
            }

            responseHistory.push(history);
            return randomMessage[getRandomNumber(randomMessage.length)];
            
        case 'humidity':
            randomMessage = [
                `As of ${getTimeAndDate()}, the humidity is at ${humidity} %`, 
                `In your current location, the humidity is at ${humidity} %`,
                `${humidity} %, is the current humidity at your location`
            ]

            history = {
                id: generateId(),
                time: getTimeAndDate(), 
                data: `Humidity :${humidity}%`
            }

            responseHistory.push(history);
            return randomMessage[getRandomNumber(randomMessage.length)]; 

        default:
            const message = `Right now, as of ${getTimeAndDate()}, the temperature
             is ${temperature} degrees, and currently, the humidity is at ${humidity}%`;

             history = {
                 id: generateId(),
                time: getTimeAndDate(), 
                data: `Temperature: ${temperature}°F & Humidity ${humidity}%`
            }

            responseHistory.push(history);
            return  message;
    }
}

const getRandomNumber = (len)=>  {
    return Math.floor(Math.random() * len);
    // return Math.random() * (len - 0) + 0;
}

const generateId = () => {
    return uuidv4(); 
}

const getTimeAndDate = () => {
    var time = Date.now(); 
    var date = new Date(time); 
    const hour = date.getHours(); 
    const tempmin = date.getMinutes();
    let minute =''; 
    if(tempmin < 10){
        minute = `0${tempmin}`
    }
    minute = tempmin; 

    return `${hour - 12}:${minute}`; 
}

export const getResponseHistory = () => {
    return responseHistory; 
}

export const itContainsGreetings = (command) =>{
    let contains = false;
    greetingsPhrase.forEach(phrase =>{
        if(parseReExp(phrase).test(command) || parseReExp(phrase.toUpperCase()).test(command) || parseReExp(phrase.toLowerCase()).test(command)){
            contains = true;
        }
    })
    return contains; 
}