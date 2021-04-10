
import React, {useState} from 'react'
import {getTemperature, getHomeEnvi, commandSwitcher} from '../utilities/utils';
import {say,startRecoding, getErrors} from './CommandControl';
import {responseMessage, getResponseHistory} from '../utilities/responseData';

const Command = () => {
    const [command, setCommand] = useState('');
    const [statusMessage, setStatusMessage] = useState([]); 

    const speak = ()=> (e) => {
        getTemperature()
        const message = getMessage();
        say(message, 4);
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
                                <form className="form-group">
                                    <input onChange={handleOnchange} className="form-control" type="text" name="command" style={{height: '100px'}}/>
                                    <br/>
                                    <button onClick={send} className="btn" style={{backgroundColor:'orange'}}>Send</button>
                                </form>
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