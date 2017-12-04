import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  
  constructor(props){
    super(props);

    this.state={
      sampleArray : ['name' , 'age']
    }
  }


  render() {




    return (
      <div className="banner">
        <div className="banner-text">
          <h2 className="bnr-title wow zoomIn animated" data-wow-delay=".5s">Auction Market</h2>	
          <h4 className="bnr-title wow zoomIn animated" data-wow-delay=".5s">Powered with Blockchain Technology</h4>	
          <p className="wow fadeInUp animated" data-wow-delay=".7s">Distributed Consensed Open Source Blockchain Technology.
</p>  
          <p className="wow fadeInUp animated" data-wow-delay=".7s">Are You Ready To Sell? Auctions Speak Louder. Turning Assets Into Cash. Let’s Get Buying!!! 
</p>
          
          <div className="more">
            
            <Link to="/home-garden" className="button scroll" data-text="More About">Explore</Link>
          </div>
          <div className="social-icons wow slideInUp animated" data-wow-delay=".9s">
          </div>
        </div>	
      </div>

    );
  }
}

export default Home;
