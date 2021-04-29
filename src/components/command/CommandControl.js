import { commandSwitcher } from "../utilities/utils";

export const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
export const synth = window.speechSynthesis;
let myerror = [];
let speech = null;

export const startRecording = () => async (e) =>{
    await recognition.start();
}


recognition.onresult = async (event)=> {
    await recognition.stop(); // stop the cording 
    speech = event.results[0][0].transcript;
    commandSwitcher(speech);
}

recognition.onend = async ()=> {
    await recognition.stop();
}

recognition.onerror = (event) => {
    recognition.stop();
    myerror.push('Error: ' + event.error);
    say("Oops, I have encountered an error: " + event.error);
};

export const say = (message) => {
    const voice = 3;
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

export const stopRecording = ()=> {
    recognition.stop();
}

export const getErrors = () => {
    return myerror;
}

