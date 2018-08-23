import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class ImageDetail extends Component {
  deleteImage(id){
      const newPost = () => {
        const options = {
          method:'DELETE',
          headers: new Headers({
            'Content-Type':'application/json'
          })
        }

        return fetch('http://localhost:8000/book/'+ id, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log(error))

      }
      window.location.assign('http://localhost:8080/');
      newPost();
  }

  render(){
    console.log(this.props);
    if(!this.props.image){
      window.location.assign('http://localhost:8080/');
    }


    return (
      <div className="container details">
         <Link to="/">
          <button className="center-block btn btn-primary"> Back to gallery</button>
         </Link>
          <div className="row">
            <div height="50px;" className="span4"></div>
            <div className="span4"><img className="center-block"  width="70%" src={this.props.image.src} /></div>
            <div className="span4 text-center" id="date">Date added:{this.props.image.dates}</div>
            <button onClick={() =>this.deleteImage(this.props.image.id)} className="btn text-center">Click here to delete the picture</button>
            <div> <img src = {this.props.activeUser.thumbnail} /> <br /> {this.props.activeUser.username}</div>
          </div>

      </div>

    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    image: state.activeImage,
    activeUser: state.activeUser
  };
}

export default connect(mapStateToProps)(ImageDetail);
