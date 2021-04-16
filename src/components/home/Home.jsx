import React, { Component } from 'react'; 
import neurolinks from '../images/neurolinks.jpg';
import neurolink2 from '../images/neurolinks2.jpg';
import iot from '../images/IOT.jpg';
import iot2 from '../images/IOT2.jpg';

import '../../App.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <div>
        <div style={bg}>
          <div className="contain">
            <div className="title-wrapper text-center text-white">
              <h1 className="title">The world is at the tip of your tongue</h1>
              <h3 className="subtittle">Control every aspect of your home with your voice</h3>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="container">
            <h3 className="text-center">Controls</h3>
          </div>
        </div>
      </div>
    );
  }
}

const myBgs = [ neurolinks,iot, iot2, neurolink2]; 

const getRandomNumber = ()=> {
  return Math.floor(Math.random() * (myBgs.length - 0) + 0);
}
const bg = {
  backgroundImage: `url("${myBgs[getRandomNumber()]}")`, 
  height:'700px'
}


export default Home;