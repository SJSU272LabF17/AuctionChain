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
      <div >
       


        <div id="myCarousel" className="carousel slide" data-ride="carousel">
         
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
        
         
          <div className="carousel-inner">
            <div className="item active">
              <img src={require("../assets/1.jpg")} onClick={() => {
                this.props.history.push('/home-garden') ;
              }} width="100%"  alt="Los Angeles"/>
            </div>
        
            <div className="item">
              <img src={require("../assets/goods.JPG")} onClick={() => {
                this.props.history.push('/home-garden') ;
              }} width="100%"  alt="Chicago"/>
            </div>
        
            <div className="item">
              <img src={require("../assets/shopping.jpg")}  onClick={() => {
                this.props.history.push('/home-garden') ;
              }} width="100%"  alt="New York"/>
            </div>
          </div>
        
         
          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>



      </div>

    );
  }
}

export default Home;
