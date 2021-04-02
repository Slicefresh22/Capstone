import React from 'react';
import ReactDOM from 'react-dom'
import Navbar from '../Navbar'

it('shoud rend the navbar', () => {
    const div = document.createElement("div"); 
    ReactDOM.render(<Navbar></Navbar>, div);
})