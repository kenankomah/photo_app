import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import ImagesReducer from '../reducers/reducer_images';
import IdExport from '../reducers/id_export';
import Upload from './upload';
import Profile from './profile';
import Footer from './footer';
 
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

  componentDidMount(){
     IdExport().payload
     .then(activeUserInfo => {
         const userData =  {
            type:'USER_DATA',
            payload: activeUserInfo
         }
         this.props.userDetails(userData);
      });
 
    ImagesReducer().payload
      .then(posts => {
        const arr = [];
        posts.map( el => {
        arr.push({src:el.src, dates:el.dates, id:el._id, mongoId:el.mongoId, filter: el.filter});
      });

    //load is an action
     const load =  {
        type:'IMAGE_LIST',
        payload: arr
     }
      this.props.actionArr(load);      
    });
  }
   
  render(){  
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
       
      </div>
    )
  }
}

//the actionCreator actionArr dispatches the array arr to the application state and then mapStateToProps adds to the props
function mapStateToProps(state) {
  return {
    images: state.images,
    activeUser: state.activeUser
  };
}



//Anything returned from this function will end up as props on the ImageList container
function mapDispatchToProps(dispatch){ 
   return {
      selectImage: function (selectImg) {return dispatch(selectImg)},
      actionArr : function (actionArr) {return dispatch(actionArr)},
      userDetails : function (userDetails) {return dispatch(userDetails)}
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);

