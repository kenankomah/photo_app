import React, { Component } from 'react';
import {connect} from 'react-redux';
//import { selectImage } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import ImagesReducer from '../reducers/reducer_images';
import IdExport from '../reducers/id_export';
import Upload from './upload';
import Profile from './profile';
import Footer from './footer';

IdExport();
 
class ImageList extends Component {

   renderList(){

   return this.props.images.map((image) => {
      const select_image = {
        type:'IMAGE_SELECTED',
        payload: image
      }

      return (
         <div key={image.src} className="grid-box"> 
            <Link to="list"
              onClick={() => this.props.selectImage(select_image)}>
              <img src={image.src} style={{filter:image.filter}} />
            </Link>
         </div>       
      );
    });
  }

  // redirect(){
  //   window.location.assign('http://localhost:8000/upload_image');
  // }

  // loggout(){
  //   localStorage.removeItem('loggedIn');
  // } 

  render(){
  //console.log(this.props.activeUser)  
    const test2 = () => {
      IdExport().payload
     .then(activeUserInfo => {
         const userData =  {
            type:'USER_DATA',
            payload: activeUserInfo
         }
         this.props.userDetails(userData);
      });
    }

   test2();

   const test = () => {
     ImagesReducer().payload
    .then(posts => {
        const arr = [];
        posts.map( el => {
        arr.push({src:el.src, dates:el.dates, id:el._id, mongoId:el.mongoId, filter: el.filter});
      })
    //load is an action
     const load =  {
        type:'IMAGE_LIST',
        payload: arr
     }

      this.props.actionArr(load);
      //console.log(load.payload)

    });

   }
   test();
  
     return (
       <div id="home">
        <span></span>

        <div id="nav-bar">
          <Upload />
          <Profile />            
        </div>              
        <h1>Image Gallery</h1>
        <div className="picture-grid">
          {this.renderList()}
        </div> 
        <Footer />   
      </div>
    )
  }
}

//the actionCreator actionArr dispatches the array arr to the application state and then mapStateToProps adds to the props
function mapStateToProps(state) {
  //console.log(state.activeUser)
  return {
    images: state.images,
    activeUser: state.activeUser
  };
}

//const selectImg = selectImage();

//console.log(selectImg);

//Anything returned from this function will end up as props on the ImageList container
function mapDispatchToProps(dispatch){ //second selectImage is the one thatwas imported above.
  //Whenever selectImage is called the result should be passed to all of our reducers
  //return bindActionCreators({ selectImage: selectImage, actionArr : actionArr }, dispatch);
   return {
      selectImage: function (selectImg) {return dispatch(selectImg)},
      actionArr : function (actionArr) {return dispatch(actionArr)},
      userDetails : function (userDetails) {return dispatch(userDetails)}
    }
  }
//the dispatch gets the results of the selectImage (i.e. the action) call and spits it back out to all the reducers in the application.
//To promote ImageList from a component to a container - it needs to know about this new dispatch method, selectImage.
//To make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
//Highly recommends referencing the react-redux documentation
