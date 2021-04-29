
import React, {useState} from 'react'
import {getTemperature, getHomeEnvi, commandSwitcher, getCurrentUser} from '../utilities/utils';
import {say,startRecording, getErrors} from './CommandControl';
import {responseMessage, getResponseHistory} from '../utilities/responseData';

const Command = () => {
    const [command, setCommand] = useState('');
    const [statusMessage, setStatusMessage] = useState([]); 

    const speak = ()=> (e) => {
        getTemperature()
        const message = getMessage();
        say(message);

        setTimeout(()=> {
            say(`Is there anything else that i can help you with?`);
            say(`${getCurrentUser()}`); 
        }, 3000);


        if(getErrors().length > 0) console.log(getErrors());
        updateState();
    }

    const updateState =  ()=> {
        setStatusMessage(getResponseHistory());
    }

    // update the screen every 2 second
    window.setInterval(updateState, 1000);

    const getMessage =  ()=> {
        const data =  getHomeEnvi();
        const message = responseMessage(data, '');
        return message;
    }

    const send = (event)=> {
        event.preventDefault();
        getLightStatus(command);
    }

    const handleOnchange = (event)=> {
        event.preventDefault();
        setCommand(event.target.value);
    }

    const getLightStatus = (status)=> {
        commandSwitcher(status);
    }

    return (
        <div className="command-wrapper">
            <div className="card">
                <div className="card-body">
                    <h5>Action Center</h5>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h6>Start Voice Regoniction</h6>
                            <hr/>
                            <div className="row">
                                <div className="col-lg-6 mb-4 card-body">
                                    <button onClick= {startRecording()} className="btn btn-warning" style={{backgroundColor:'orange'}}>Start Listening</button>
                                </div>
                                <div className="col-lg-6 mb-4  card-body">
                                    <button onClick= {speak()} className="btn btn-warning" style={{backgroundColor:'orange'}}>Status Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>

                    <div className="card">
                        <div className="card-body">
                            <h6>Enter your command Manually</h6>
                            <hr/>
                            <form className="form-group">
                                <input className="form-control" onChange={handleOnchange} type="text" name="command" style={{height: '100px'}}/>
                                <br/>
                                <button className="btn" style={{backgroundColor:'orange'}} onClick={send}>Send</button>
                            </form>
                        </div>
                    </div>

                </div>
                <div className="col-lg-6">
                <div className="card">
                        <div className="card-body">
                            <h6>Results History</h6>
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
            </div>
        </div>
    )
};

export default Command;