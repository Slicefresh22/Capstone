import React, {useState, useEffect} from 'react'
import {loadPrerence} from './utilities/utils'

const Preference = ()=> {
    const [myAPI, setMyAPI] = useState([]); 
    const [tempUrl, setTempUrl] = useState('');
    const [humidityUrl, setHumidityUrl] = useState(''); 
    const [proximityUrl, setProximityUrl] = useState('');
    

    useEffect(()=>{
        const fetcall = async () => {
            await handleLoadPreference();
        }
        
        fetcall();
    })

    const handleLoadPreference =  ()=> {
        const data = loadPrerence()
        data.then(response => {
            const {Items} = response.data; 
            setMyAPI(Items)
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleChange = ()=> (event)=>{
        // updateUrl(event.target.name, event.target.value); 
        console.log(event.target.name);
        switch(event.target.name){
            case 'temp':
                setTempUrl(event.target.value);
                break;
            case 'humid':
                setHumidityUrl(event.target.value);
                break;
            case 'prox':
                setProximityUrl(event.target.value);
                break;
            default:
                console.log('error updateUrl')
        }
    }

    const updateUrl = (servicename, value) =>{
        const selected =  myAPI.filter(api => api.name === servicename);
        const tempAPI = [];
        myAPI.forEach(api => {
            if(api.name === selected[0].name){
                const temp = {...api, url: value}; 
                tempAPI.push(temp);
            }
            else {
                tempAPI.push(api); 
            }
        })

        setMyAPI(tempAPI); 
    }

    const saveChange = () => (e)=>{
        e.preventDefault();
        console.log({tempUrl, proximityUrl, humidityUrl});
    }

    return (
        <div className="pref-wrapper">
            <div>
                <h4>Settings & Preferences</h4>
            </div>
            <hr/>
            <div className="mt-4">
                {
                    myAPI.map(api => (
                        <div className="row" key={api.id}>
                            <div className="col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <i className="fas fa-info-circle" style={{float: 'right'}}></i>
                                        <div className="card-text mt-3">
                                            <p>{api.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className="col-lg-8">
                                <div className="">
                                    <form className="form-group">
                                        <input onChange={handleChange()} style={{paddingLeft: '100px'}} className="form-control" type="text" name={api.name} 
                                        /> <br/>
                                        <p>Current endpoint: {api.ur}</p>
                                         <i className="fas fa-edit" style={{float: 'right'}}></i>
                                    </form>
                                </div>
                                <br/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <hr/>
            <br/>
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <form className="form-group">
                            <button className="btn btn-danger form-control mb-2">Cancel</button>
                        </form>
                    </div>
                    <div className="col-lg-6">
                        <form className="form-group">
                            <button className="btn btn-success form-control mb-2" onClick={saveChange()}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preference;


