import React, { Component } from 'react'
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import Home from './Home';

class Dashboard extends Component {
    state = {
        currentPage: 'dashboard', 
    }

    componentWillUnmount(){
        const { oktaAuth, authState } = useOktaAuth();
        if(!authState.isAuthenticated) <Redirect to= {{pathname: '/login'}}></Redirect>
    }

    handleChange = () => (event)=>{
        event.preventDefault();
        this.setState({currentPage: event.target.value.toLowerCase()});
        alert(this.state.currentPage);
    }

    render() {
        const { currentPage } = this.state;
         switch(currentPage) {
             case 'dashboard':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2"> 
                                <nav className="navbar ">
                                    <ul className="nav navbar list-group">
                                        <li className=" mb-1"><input className="list-group-item form-control btn bg-info" value={'Dashboard'} onClick={this.handleChange()}/></li>
                                        <li className=" mb-1"><input className="list-group-item form-control btn bg-info" value={'Preference'} onClick={this.handleChange()}/></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-md-9">
                                <Home></Home>
                            </div>
                        </div>
                    </div>
                );

            case 'preference':
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-2">
                                <nav className="navbar ">
                                    <ul className="nav navbar list-group">
                                        <li className=" mb-1"><input className="list-group-item form-control btn bg-info" value={'Dashboard'} onClick={this.handleChange()}/></li>
                                        <li className=" mb-1"><input className="list-group-item form-control btn bg-info" value={'Preference'} onClick={this.handleChange()}/></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-md-9">
        
                            </div>
                        </div>
                        
                    </div>
                );
         }
    }
}

export default Dashboard;