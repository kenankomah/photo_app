import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import Upload from './upload';
import Profile from './profile';
import { confirmAlert } from 'react-confirm-alert'; 


class ImageDetail extends Component {
   deleteImage(id){
      const newPost = () => {
        const options = {
          method:'DELETE',
          headers: new Headers({
            'Content-Type':'application/json'
          })
        }

        return fetch('http://localhost:5000/image/'+ id, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log(error))

      }
      window.location.assign('/');
      newPost();
  }

  

  submit = (imageId) => {    
    confirmAlert({
      title: '',
      message: "Are you sure you want to delete this image?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.deleteImage(imageId)
        },
        {
          label: 'No',
          onClick: () => console.log('closed')
        }
      ]
    }) 
  };


  returnIndex(imageSrc){
    for(let i=0; i<this.props.images.length; i++){
        if(this.props.images[i].src === imageSrc){
            return i;
        }
     }   
  }

  updateSource(index){    
    document.getElementById("detail-img").src = this.props.images[index].src;

    const select_image = {
      type:'IMAGE_SELECTED',
      payload: this.props.images[index]
    }
    this.props.selectImage(select_image);
  }

  imageSlider(direction){
    let imageSrc = document.getElementById("detail-img").src;
    let index = this.returnIndex(imageSrc);    
    this.props.images.length; 
    

    if(direction === "next" && index !== this.props.images.length - 1 ){
      index++;
      this.controlButtons();
    }else if(direction === "previous" && index !== 0){      
      index--;
      this.controlButtons();      
    } 
    

    if(index === this.props.images.length - 1){
      document.getElementById("next").classList.add("inactive");
    }else if(index === 0){
      document.getElementById("previous").classList.add("inactive");
    }else if(document.querySelector(".inactive")){
      document.getElementById("next").classList.remove("inactive");
      document.getElementById("previous").classList.remove("inactive");
    }

    this.updateSource(index);    
    
  }

  controlButtons(){
    //fade in animation
    document.getElementById("detail-img").animate({
      opacity: [ 0, 1 ],          // [ from, to ]
      color:   [ "#fff", "#000" ] // [ from, to ]
    }, 750);
  }

  componentDidMount(){
    //code below runs when the component is rendered
    this.controlButtons();
    this.imageSlider();
  }

  render(){
    if(!this.props.image){
      window.location.assign('/');
    }

    return (
      <div id="detail-container">
        <div className="container details" id="img_details"></div>
        <div id="nav-bar">
          <Upload />
          <Profile />            
        </div>
        <div id="button-div"> 
            <svg onClick={() =>this.imageSlider("previous")}  id ="previous" className="slide" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 492 492"  enable-background="new 0 0 492 492">
                <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
                  C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
                  c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864		l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"/>
            </svg>
            <Link to="/">
              <button className="center-block btn btn-primary" id="back-home"> Back to gallery</button>
            </Link>
            <svg onClick={() =>this.imageSlider("next")} id ="next" className="slide" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 492.004 492.004"  enable-background="new 0 0 492.004 492.004">
              <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
                  c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
                  c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
                  c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"/>
            </svg>          
        </div>
        <div  height="50px;" className="span4"></div>
          <img onload={() =>this.controlButtons()} className="center-block" id="detail-img" src={this.props.image.src} style={{filter:this.props.image.filter}} />          
          <div className="span4 text-center" id="date">Added <span className="time">on</span>:{this.props.image.dates.split(" ")[0]} <span className="time">at</span>:{this.props.image.dates.split(" ")[1]}
            <br/>
            <button onClick={() =>this.submit(this.props.image.id)} className="btn btn-primary "><i className="fa fa-trash"></i> Delete Image</button>
            <Link to="/filters">      
                <button className="btn btn-primary"><i className="fa fa-edit"></i> Add Filters</button>
            </Link>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    image: state.activeImage,
    images: state.images
  };
}

function mapDispatchToProps(dispatch){ 
   return {
      selectImage: function (selectImg) {return dispatch(selectImg)}
   }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
