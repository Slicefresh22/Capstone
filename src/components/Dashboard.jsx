import React, {useState, useEffect } from 'react'
import Navbar from './Navbar';
import {Link, Redirect} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import {setUri} from './utilities/utils'

import Home from './Home';
import LeftAside from './LeftAside';
import Preference from './Preference';

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState('dashboard'); 
    const [history, setHistory] = useState(useHistory());
    const [oktaAuth, setOktaAuth] = useState(useOktaAuth()); 
    const [authState, setAuthState] = useState(useOktaAuth());
    const [menuItems, setMenuItems] = useState( [
        {
            id: 0,
            name: 'dashboard', 
            alias: 'Dashboard', 
            selected: true
        }, 
        {
            id: 1,
            name: 'preference', 
            alias: 'Preference', 
            selected: false
        }

    ])
    
    // method handle change 
    const handleChange = () => (event)=>{
        event.preventDefault();
        const selected = event.target.value.toLowerCase()
        setCurrentPage(selected);
        toggleSelected(selected);
    }

    const toggleSelected = async (name)=>{
        const selected = await menuItems.filter(menu => menu.name == name); 
        const changeStatus = [];
        menuItems.forEach(menu => {
            if(menu.name == selected[0].name){
                if(menu.selected == false){
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


    const login = async () => history.push('/login');
    
    const logout = async () => {
        oktaAuth.signOut();
        if(!authState.isAuthenticated) <Redirect to= {{pathname: '/login'}}></Redirect>
    }

    switch(currentPage){
        case 'dashboard':
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-4">
                            <LeftAside menuItems= {menuItems} handleChange={handleChange}></LeftAside>
                        </div>
                        <div className="col-lg-10 col-md-8">
                            <Home></Home>
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
    }
};

export default Dashboard;