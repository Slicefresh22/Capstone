import React, {useState } from 'react'
import Command from '../command/Command';
import LeftAside from '../left_aside/LeftAside';
import Preference from '../preference/Preference';
import {capstoneModel} from '../models/model';
import Messages from '../messages/Messages'
import Notifications from '../notifications/Notifications';
import Profile from '../profile/Profile'

// import { Redirect} from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { useOktaAuth } from '@okta/okta-react';


const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState('dashboard'); 
    // const [history, setHistory] = useState(useHistory());
    // const [oktaAuth, setOktaAuth] = useState(useOktaAuth()); 
    // const [authState, setAuthState] = useState(useOktaAuth());
    const [menuItems, setMenuItems] = useState(capstoneModel.navigationItems)
    
    // method handle change 
    const handleChange = () => (event)=>{
        event.preventDefault();
        const selected = event.target.value.toLowerCase()
        setCurrentPage(selected);
        toggleSelected(selected);
    }

    const toggleSelected = (name)=>{
        const selected =  menuItems.filter(menu => menu.name === name); 
        const changeStatus = [];
        menuItems.forEach(menu => {
            if(menu.name === selected[0].name){
                if(menu.selected === false){
                    const temp = {...menu, selected: true}; 
                    changeStatus.push(temp);
                }
                else{
                    changeStatus.push(menu);
                }
            }
            else {
                const temp = {...menu, selected:false};
                changeStatus.push(temp); 
            }
        })
        setMenuItems(changeStatus);
    }


    // const login = async () => history.push('/login');
    
    // const logout = async () => {
    //     oktaAuth.signOut();
    //     if(!authState.isAuthenticated) <Redirect to= {{pathname: '/login'}}></Redirect>
    // }

    switch(currentPage){
        case 'dashboard':
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-4">
                            <LeftAside menuItems= {menuItems} handleChange={handleChange}></LeftAside>
                        </div>
                        <div className="col-lg-10 col-md-8">
                            <Profile></Profile>
                        </div>
                    </div>
                </div>
            )

        case 'preference':
            return(
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-4">
                            <LeftAside menuItems= {menuItems} handleChange={handleChange}></LeftAside>
                        </div>
                        <div className="col-lg-10 col-md-8">
                            <Preference></Preference>
                        </div>
                    </div>
                </div>
            )
        case 'messages':
            return(
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-4">
                            <LeftAside menuItems= {menuItems} handleChange={handleChange}></LeftAside>
                        </div>
                        <div className="col-lg-10 col-md-8">
                            <Messages></Messages>
                        </div>
                    </div>
                </div>
            )
        case 'action-center':
            return(
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-4">
                            <LeftAside menuItems= {menuItems} handleChange={handleChange}></LeftAside>
                        </div>
                        <div className="col-lg-10 col-md-8">
                            <Command></Command>
                        </div>
                    </div>
                </div>
            )
        case 'notifications':
            return(
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-4">
                            <LeftAside menuItems= {menuItems} handleChange={handleChange}></LeftAside>
                        </div>
                        <div className="col-lg-10 col-md-8">
                            <Notifications></Notifications>
                        </div>
                    </div>
                </div>
            )


        default: {
            return null
        }
    }
};

export default Dashboard;