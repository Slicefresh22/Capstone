
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
    say(speech);
    console.log(event.target.grammars);
}

recognition.onerror = (event) => {
    myerror.push('Error: ' + event.error);
    say("Oops, an error has occured: " + event.error);
};

export const say = (message, voice = 4) => {
    var utterance  = new SpeechSynthesisUtterance(message);
    utterance .voice = setVoice(voice);
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
        if(wakeUpName == 'Karen' || wakeUpName == 'karen'){
            say('Hi, what can id do for you?')
            recognition.stop();
            recognition.start();
        }
        else{
            stopRecording();
            say(wakeUpName);
        }
        // recognition.stop();
        // startRecoding();
    }
}

export const getErrors = () => {
    return myerror;
}