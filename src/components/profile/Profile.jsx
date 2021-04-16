import {Component} from 'react'; 
import {getAverages, getLightStatus} from '../utilities/utils'

class Profile extends Component {
    state = { 
        tempUrl: '', 
        lightStatus: '', 
        averageTemp: 0, 
        averageHumid: 0
    };

    componentDidMount(){
       const {averageTemp,averageHumid} = getAverages();
       this.setState({averageTemp: averageTemp, averageHumid: averageHumid});
       this.setState({lightStatus: getLightStatus()});
    }

    render() {
        return (
            <div className="profile-wrapper">
                <div className="card">
                    <div className="card-body">
                        <h4>Welcome to your Dashboard, User</h4>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body text-center" style={{backgroundColor: 'orange', color:'black'}}>
                                <h6>Average Temperature <hr/></h6>
                                <h1>{this.state.averageTemp} °</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                        <div className="card-body text-center" style={{backgroundColor: 'orange', color:'black'}}>
                            <h6>Average Humidity <hr/></h6>
                            <h1>{this.state.averageHumid} %</h1>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body text-center" style={{backgroundColor: 'orange', color:'black'}}>
                            <h6>Light Status <hr/></h6>
                            <h1>{this.state.lightStatus} </h1>
                        </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                        <iframe className="card-body"  height="280" style={{border: '1px solid #cccccc'}} 
                        src="https://thingspeak.com/channels/1348356/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=step" title="Light"></iframe>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                        <iframe title="temperature" className="card-body"  height="280" style={{border: '1px solid #cccccc'}} 
                        src="https://thingspeak.com/channels/1320900/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Temperature&type=column&xaxis=Time&yaxis=Temperature"></iframe>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                        <iframe title="humidity" className="card-body"  height="280" style={{border: '1px solid #cccccc'}} 
                        src="https://thingspeak.com/channels/1320900/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Humidity&type=column"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;