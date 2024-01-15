import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from "react";
import loading from '../public/images/loader.gif';

class Loaderimage extends Component {
  componentDidMount()
  {
    // document.body.style.display = "none";
    // document.body.style.pointerEvents = 'none';
   
  }
    render() {
      
return( 
  <div className="modal"  role="dialog" style={{display:this.props.show, zIndex:'100000'}} >
  {/* <Spinner size="lg" color="secondary" /> */}
  <img className="loader img-fluid" src={loading} style={{zIndex:this.props.zindex}} />
  {/* <div className="loader">
  <div className="bar1_"></div>
  <div className="bar2_"></div>
  <div className="bar3_"></div>
  <div className="bar4_"></div>
  <div className="bar5_"></div>
  <div className="bar6_"></div>
</div> */}
  </div>
    );
    }
}
export default Loaderimage;