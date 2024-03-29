import { v4 as uuidv4 } from 'uuid';
import {getCurrentUser} from '../utilities/utils'; 

var responseHistory = []; 
const greetingsPhrases = [ 'Hello there', 'hello', 'Hello', 'Hi', 'hi', 'good morning', 'hey', 'Hey']; 
const lightOnPhrases = ['light on', 'turn on the light', 'turn the light on','turn on light']; 
const lightOffPhrases = ['light off', 'turn off the light', 'turn the light off']; 
const temperaturePhrases = ['temperature', 'temp','weather'];
const humidityPhrases = ['humidity', 'humid']; 
const lightPhrases = ['light']; 
const wakeNamePhrase = ['dave', 'David', 'Dave', 'david'];
const fanOnPhrases = ['fan on', 'turn on the fan','turn the fan on', 'start the fan', 'cool the room down'];
const fanOffPhrases = ['fan off', 'turn off the fan', 'turn the fan off', 'it too cold, heat up the room'];

export const responseMessage = (data, topic = '')=> {
    const {temperature, humidity} = data;
    var randomMessage = [];
    var history = {};

    switch(topic){
        case 'temperature':
            // do somethings here
            randomMessage = [
                `${getCurrentUser()}, Right now, the temerature is ${temperature} degrees fahrenheit`, 
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
    let hours = date.getHours(); 
    const tempmin = date.getMinutes();
    let minute =''; 
    if(tempmin < 10){
        minute = `0${tempmin}`
    }
    else {
        minute = tempmin;
    }

    if(hours > 12) {
        hours -= 12;
    }
    // hours < 12 ? theTime = `${hours}:${minute}` : theTime = `${hours + 12}:${minute}`; 

    return hours + ":" + minute;
}

export const getResponseHistory = () => {
    return responseHistory; 
}

export const itContainsGreetings = (command) =>{
    let contains = false;
    greetingsPhrases.forEach(phrase =>{
        if(parseReExp(phrase).test(command) || parseReExp(phrase.toUpperCase()).test(command) || parseReExp(phrase.toLowerCase()).test(command)){
            contains = true;
        }
    })
    return contains; 
}

export const itContainsLightOn = (command) => {
    let contains = false;
    lightOnPhrases.forEach(phrase =>{
        if(parseReExp(phrase).test(command) || parseReExp(phrase.toUpperCase()).test(command) || parseReExp(phrase.toLowerCase()).test(command)){
            contains = true;
        }
    })
    return contains; 
}

export const itContainsLightOff = (command) => {
    let contains = false;
    lightOffPhrases.forEach(phrase =>{
        if(parseReExp(phrase).test(command) || parseReExp(phrase.toUpperCase()).test(command) || parseReExp(phrase.toLowerCase()).test(command)){
            contains = true;
        }
    })
    return contains; 
}

export const itContainsFanOn = (command) => {
    let contains = false;
    fanOnPhrases.forEach(phrase =>{
        if(parseReExp(phrase).test(command) || parseReExp(phrase.toUpperCase()).test(command) || parseReExp(phrase.toLowerCase()).test(command)){
            contains = true;
        }
    })
    return contains; 
}

export const itContainsFanOff = (command) => {
    let contains = false;
    fanOffPhrases.forEach(phrase =>{
        if(parseReExp(phrase).test(command) || parseReExp(phrase.toUpperCase()).test(command) || parseReExp(phrase.toLowerCase()).test(command)){
            contains = true;
        }
    })
    return contains; 
}

export const itContainsGeneric = (command, category) => {
    switch(category){
        case 'temperature':
             return itContains(temperaturePhrases, command); 
        case 'humidity':
            return itContains(humidityPhrases, command); 
        case 'light':
            return itContains(lightPhrases, command); 
        case 'wakename':
            return itContains(wakeNamePhrase, command); 
        default:
            return false;
    }
}

const itContains = (data, command) => {
    let contains = false;
    data.forEach(phrase =>{
        if(parseReExp(phrase).test(command) || parseReExp(phrase.toUpperCase()).test(command) || parseReExp(phrase.toLowerCase()).test(command)){
            contains = true;
        }
    })
    return contains;
}

// parins command cheking for matchin key words
const  parseReExp = (phrase) => {
    return new RegExp('\\b' + phrase + '\\b');
}