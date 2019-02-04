import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Upload from './upload';
import Profile from './profile';
import Footer from './footer';


class ImageDetail extends Component {
    deleteImage(id){
      const newPost = () => {
        const options = {
          method:'DELETE',
          headers: new Headers({
            'Content-Type':'application/json'
          })
        }

        //return fetch('/image/'+ id, options)
        return fetch('http://localhost:5000/image/'+ id, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log(error))

      }
      window.location.assign('/');
      newPost();
  }

  returnIndex(imageSrc){
    for(let i=0; i<this.props.images.length; i++){
        if(this.props.images[i].src === imageSrc){
            return i;
        }
     }   
  }

  updateSource(index){    
    document.getElementById("detail-img").src = this.props.images[index].src;
  }

  imageSlider(direction){
    let imageSrc = document.getElementById("detail-img").src;
    console.log(this.returnIndex(imageSrc));
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
    document.querySelector('footer').style.top =  "412px";//(window.innerHeight - 110)  + "px";
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
          
            {/* <button className="slide" id="back" onClick={() =>this.imageSlider("previous")}> 
            
            </button> */}


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
          <img onload={() =>this.controlButtons()} className="center-block" id="detail-img" src={this.props.image.src} />
          
          <div className="span4 text-center" id="date">Added <span className="time">on</span>:{this.props.image.dates.split(" ")[0]} <span className="time">at</span>:{this.props.image.dates.split(" ")[1]}
            <br/>
            <svg className = "icon_bin" onClick={() =>this.deleteImage(this.props.image.id)} x="0px" y="0px"
              viewBox="0 0 512 512" enable-background="new 0 0 512 512">
                <rect x="166.4" y="230.4" width="25.6" height="204.8"/>
                <rect x="243.2" y="230.4" width="25.6" height="204.8"/>
                <rect x="320" y="230.4" width="25.6" height="204.8"/>
                <path d="M422.4,51.2H320V25.6C320,11.46,308.54,0,294.4,0h-76.8C203.46,0,192,11.46,192,25.6v25.6H89.6
                  C75.46,51.2,64,62.66,64,76.8V128c0,14.14,11.46,25.6,25.6,25.6v332.8c0,14.14,11.46,25.6,25.6,25.6h281.6
                  c14.14,0,25.6-11.46,25.6-25.6V153.6c14.14,0,25.6-11.46,25.6-25.6V76.8C448,62.66,436.54,51.2,422.4,51.2z M217.6,25.6h76.8v25.6
                  h-76.8V25.6z M396.8,486.4H115.2V153.6h281.6V486.4z M422.4,128H89.6V76.8h332.8V128z"/>
            </svg>
          </div>
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    image: state.activeImage,
    images: state.images
  };
}

export default connect(mapStateToProps)(ImageDetail);

