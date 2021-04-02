import React, { Component } from 'react'; 
import neurolinks from '../images/neurolinks.jpg';
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

const bg = {
  backgroundImage: `url("${neurolinks}")`, 
  height:'600px'
}
export default Home;