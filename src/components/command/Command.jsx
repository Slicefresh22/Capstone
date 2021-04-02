
import React, {useState} from 'react'
import {loadPrerence, getTemperature, getHomeEnvi} from '../utilities/utils';
import {recognition, say, setVoice, startRecoding, stopRecording, getErrors} from './CommandControl';
import {responseMessage, getResponseHistory} from '../utilities/responseData';

const Command = () => {
    const [command, setCommand] = useState('');
    const [statusMessage, setStatusMessage] = useState([]); 

    //const [voiceRecognition, setVoiceRecognition] = useState(recognition);
    // const [tempUrl, setTempUrl] = useState('');

    const speak = ()=> (e) => {
        getTemperature()
        const message = getMessage();
        say(message, 4);
        if(getErrors().length > 0) console.log(getErrors());
        updateState();
    }

    const getMessage =  ()=> {
        const data =  getHomeEnvi();
        const message = responseMessage(data, '');
        return message;
    }

    const updateState =  ()=> {
        setStatusMessage(getResponseHistory());
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
                            <div className="col-lg-6 mb-4">
                                <button onClick= {startRecoding()} className="btn btn-warning" style={{backgroundColor:'orange'}}>Start Listening</button>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <button onClick= {speak()} className="btn btn-danger" style={{backgroundColor:''}}>Stop Listening</button>
                            </div>
                            <hr/>
                            <br/>
                            <div className="mt-4 mb-4">
                                <p>Enter Command Manually Below</p>
                                <div className="card">
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
                    </div>

                </div>
                <div className="col-lg-6">
                    <div>
                        <h5>Results history</h5>
                        <hr/>
                        <div className="card-boby">
                           {statusMessage.map((mess) => (
                               <div style={{height:'80px', backgroundColor:'#e8d43f'}} className="alert mt-2" key={mess.id}>
                                   <div>@{mess.time} <p className="text-center mt-0">{mess.data}</p></div>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
            </div>
            <br/>
           {/*<p>Enter Command Manually Below</p>
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
           </div>*/}
        </div>
    )
};

export default Command;