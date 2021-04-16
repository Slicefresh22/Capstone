// Written: Nemese Kalubi 
// Date: 4/15/2021

import { v4 as uuidv4 } from 'uuid';

const generateId = () => {
    return uuidv4(); 
}

export const capstoneModel = {
    "navigationItems": [
        {
            id: generateId(),
            name: 'dashboard', 
            alias: 'Dashboard', 
            icon: 'fas fa-home',
            selected: true
        },
        {
            id: generateId(),
            name: 'messages', 
            alias: 'Messages', 
            icon: 'fas fa-envelope',
            selected: false
        },
        {
            id: generateId(),
            name: 'notifications', 
            alias: 'Notifications', 
            icon: 'fas fa-bell',
            selected: false
        },
        {
            id: generateId(),
            name: 'action-center', 
            alias: 'Action Center',
            icon: 'fas fa-play',
            selected: false
        },
        {
            id: generateId(),
            name: 'preference', 
            alias: 'Preference',
            icon: 'fas fa-sliders-h',
            selected: false
        },
    ]
}
