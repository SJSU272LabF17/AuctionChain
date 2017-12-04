import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as hyperLedger from '../actions/hyperLedger'
class LedgerContent extends Component {
  
  constructor(props){
    super(props);

    this.state={
      ledgerContent : []
    }
  }


  componentDidMount(){
    var _this = this ; 
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

        _this.setState({ledgerContent : res})
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
      </div>

    );
  }
}

export default LedgerContent;