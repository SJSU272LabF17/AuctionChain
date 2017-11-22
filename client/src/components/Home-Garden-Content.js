import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux' ; 
import { getAllProducts } from '../actions/product_listing_action';

class HomeGardenContent extends Component {
  
    constructor(props){
      super(props);

      this.state={
        sampleArray : ['name' , 'age']
      }
    }

    componentWillMount(){
      this.props.getAllProducts('Mobiles');
  }


    render() {
      const listOfProducts = this.props.productList.map((product) => {
        return (
              <li className="liAttr">
                <div className="row">
                  <div className="divForImage col-lg-3">
                    <a>
                      <div >
                        <img className="imageAttr" alt="" src={require("../assets/1.jpg")} />
                      </div>
                    </a>
                  </div>
                  <div className="DivForImageInfo col-lg-9 textColorBlack">
                    <ul className="">
                      <li className="">  
                        <span classNme="bold"> ${product.productName} </span>
                      </li>
                      <li className="">  
                        <span classNme="bold"> Description: {product.productDesc} </span>
                      </li>
                      <li className="">  
                        <span classNme="bold"> ${product.maxBidPrice} </span>
                      </li>
                      <li className="">  
                        <span classNme="bold"> {product.numberOfBids} Bids</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
      );
    })
      return (
          <div className="rightDiv">
            <section className="sectionattr">
              <ul className="ulattr">
                {listOfProducts}
              </ul>
            </section>
          </div>
      )
    }
  }

function mapDispatchToProps(dispatch){
    return {
      getAllProducts : (category) => dispatch(getAllProducts(category))
    }
  }

  function mapStateToProps(state) {
      return {
        productList :state.ProductListingReducer.productList,
      };
  }

  export default connect(mapStateToProps,mapDispatchToProps)(HomeGardenContent) ; 