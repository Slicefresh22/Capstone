import { commandSwitcher } from "../utilities/utils";

export const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
export const synth = window.speechSynthesis;
let myerror = [];
let speechRecognitionList = window.SpeechGrammarList;
let speech = null;
let wakeUpName = '';


export const startRecoding =  () => async (e) => {
    await recognition.start();
    // e.preventDefault();
}

recognition.onresult = (event)=> {
    speech = event.results[0][0].transcript;
    // say(speech);
    commandSwitcher(speech);
}

recognition.onerror = (event) => {
    myerror.push('Error: ' + event.error);
    say("Oops, I have encountered an error: " + event.error);
};

export const say = (message, voice = 3) => {
    var utterance  = new SpeechSynthesisUtterance(message);
    utterance.voice = setVoice(voice);
    utterance.rate = 1;
    synth.speak(utterance );
}

const setVoice = (value)=> {
    const voices = synth.getVoices();
    // console.log(voices);
    return voices[value];
}

export const parseCommand = (command) => {
    // parse some command here 
}

export const stopRecording = ()=> {
    recognition.stop();
}

recognition.onspeechstart = (event)=> {
    recognition.onresult = (event)=> {
        recognition.stop();
        wakeUpName = event.results[0][0].transcript;
        if(wakeUpName === 'Karen' || wakeUpName === 'karen'){
            recognition.stop();
            say('Hi, what can i do for you?');
        }

        // recognition.stop();
        // startRecoding();
    }
}

export const getErrors = () => {
    return myerror;
}