import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class ImageDetail extends Component {
  render(){
    if(!this.props.images){
      return <div>Select a image to get started.</div>
    }

    return (
      <div className="container details">
         <Link to="/">
          <button className="center-block btn btn-primary"> Back to gallery</button>
         </Link>
          <div className="row">
            <div height="50px;" className="span4"></div>
            <div className="span4"><img className="center-block"  width="70%" src={this.props.images.src} /></div>
            <div className="span4 text-center" id="date">Date added:{this.props.images.dates}</div>
          </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.activeImage
  };
}

export default connect(mapStateToProps)(ImageDetail);
