
import React, {useState, useEffect} from 'react'
import {loadPrerence} from './utilities/utils';
import {recognition, say, setVoice, startRecoding, stopRecording, getErrors} from './CommandControl';

const Command = () => {
    const [command, setCommand] = useState('');
    const [statusMessage, setStatusMessage] = useState(''); 

    //const [voiceRecognition, setVoiceRecognition] = useState(recognition);
    // const [tempUrl, setTempUrl] = useState('');

    const speak = ()=> (e) => {
        say("Hello, the time is 4:56 pm!");
        console.log(getErrors());
    }

    return (
        <div>
            <div className="command-wrapper mb-4">
                <h4>Voice Command Center</h4>
                <hr/>
            </div>
            <div className="row">
                <div className="col-md-6 card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <button onClick= {startRecoding()} className="btn btn-warning" style={{backgroundColor:'orange'}}>Start Listening</button>
                            </div>
                            <div className="col-lg-6">
                                <button onClick= {stopRecording()} className="btn btn-danger" style={{backgroundColor:''}}>Stop Listening</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div>
                        <div className="card-bord">
                            { getErrors().map(err => (
                                <div className="alert alert-info mt-2"> {err} </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <p>Enter Command Manually Below</p>
            <div className="row">
                <div className="col-lg-6 card">
                    <div className="card-body">
                        <form className="form-group">
                            <input className="form-control" type="text" name="command" style={{height: '100px'}}/>
                            <br/>
                            <button className="btn" style={{backgroundColor:'orange'}}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Command;