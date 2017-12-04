import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Loader from 'react-loader'
import * as hyperLedger from '../actions/hyperLedger'
class LedgerContent extends Component {
  
  constructor(props){
    super(props);

    this.state={
      ledgerContent : [],
      isLoaded: false ,

          loaderOptions : {
              color: '#894EA'
          }
    }
  }


  componentDidMount(){
    var _this = this ; 
    _this.setState({isLoaded:true});
    hyperLedger.getLedger(function(res){
      console.log("Receied Response " , res ) ; 
      if(res.length > 0){
      
      res.sort(function(a, b){
        var keyA = new Date(a.transactionTimestamp),
        keyB = new Date(b.transactionTimestamp);
        // Compare the 2 dates
        if(keyA < keyB) return 1;
        if(keyA > keyB) return -1;
        return 0;
});

        _this.setState({ledgerContent : res, isLoaded:false})

      }
    })
  }

  render() {
    console.log()
   const listOfLedger = this.state.ledgerContent.map((content , key) => {
                        return <div key={key}className="row ledger-content">
                                  <div className="col-xs-6">
                                    {content.transactionId}
                                  </div>
                                  <div className="col-xs-2">
                                    {content.transactionTimestamp}
                                  </div>
                                  <div className="col-xs-4">
                                    {content.transactionType}
                                  </div>
                                </div>
                       })
  return (
      <div className="ledger-wrapper">
        <div className="row ledger-header">
          <div className="col-xs-6">
            Transction Id
          </div>
          <div className="col-xs-2">
            Time-Stamp
          </div>
          <div className="col-xs-4">
            Transaction-Type
          </div>
        </div>
        <div>
          { listOfLedger}
        </div>
        <div className="">
              <Loader loaded={!this.state.isLoaded}  options={this.state.loaderOptions} >
                <div className="loaded-contents"></div>
              </Loader>
            </div>
      </div>

    );
  }
}

export default LedgerContent;