import {Component} from 'react'; 
import {getAverages, getLightStatus, getFanStatus, getCurrentUser} from '../utilities/utils'

class Profile extends Component {
    state = { 
        tempUrl: '', 
        lightStatus: '', 
        fanStatus: '',
        averageTemp: 0, 
        averageHumid: 0, 
        users_info: {}
    };

    getDateTime() {
        var today = new Date();
        var s = today.getSeconds();
        var m = today.getMinutes();
        var h = today.getHours();
        // const liveTime = ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // var dateTime = date+' '+time;
        let mytime = new Date().toLocaleTimeString();
        try{
            const elem = document.getElementById('currentTime')
            elem.innerHTML = mytime;
        }catch(err){console.log(err)};
        setInterval(this.getDateTime, 1000);
    }

    componentDidMount(){
       const {averageTemp,averageHumid} = getAverages();
       this.setState({averageTemp: averageTemp, averageHumid: averageHumid});
       this.setState({lightStatus: getLightStatus()});
       this.setState({fanStatus: getFanStatus()});
       this.setState({users_info: getCurrentUser()});
    }

    render() {
        const {lightStatus, fanStatus,users_info} = this.state;
        const {firstName} = users_info;
        return (
            <div className="profile-wrapper">
                <div className="card">
                    <div className="card-body">
                        <h2 className="lead">Welcome to your Dashboard, 
                         {" "+ firstName} <span className="lead" id="currentTime" style={{float: 'right'}}>{this.getDateTime()}</span></h2>
                    </div>
                </div>
                <br/>
                <div className="row mt-4">
                    <div className="col-lg-3">
                        <div className="card">
                            <div className="card-body text-center" style={{backgroundColor: 'orange', color:'black'}}>
                                <h6>Average Temperature <hr/></h6>
                                <h1>{this.state.averageTemp} °</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card">
                        <div className="card-body text-center" style={{backgroundColor: 'orange', color:'black'}}>
                            <h6>Average Humidity <hr/></h6>
                            <h1>{this.state.averageHumid} %</h1>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card">
                            <div className="card-body text-center" style={lightStatus === 'ON' ? 
                            {backgroundColor: '#5ecc54', color:'black'}: {backgroundColor: '#e8664d', color:'black'}}>
                                <h6>Light Status <hr/></h6>
                                <h1>{this.state.lightStatus} </h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card">
                            <div className="card-body text-center" style={fanStatus === 'ON' ? 
                            {backgroundColor: '#5ecc54', color:'black'}: {backgroundColor: '#e8664d', color:'black'}}>
                                <h6>Fan Status <hr/></h6>
                                <h1>{this.state.fanStatus} </h1>
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