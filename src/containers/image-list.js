import React, { Component } from 'react';
import {connect} from 'react-redux';
import { selectImage } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class ImageList extends Component {
  renderList(){
    return this.props.images.map((image) => {
     return (

    /*   <Link to="list" key={image.title} >
        <li
          key={image.title}
          onClick={() => this.props.selectImage(image)}
          className="list-group-item">
          {image.title}
        </li>
       </Link>

*/

       <div key={image.title} className="col-xs-6 col-sm-3">
          <Link to="list"
             onClick={() => this.props.selectImage(image)}>
             <img width="100%" src={image.title} />
          </Link>
       </div>



      );
    });
  }

  render(){
    return (
      <div className="container">
        <h1>Gallery</h1>
        <div className="row grid">
          {this.renderList()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  //Whatever is returned from here will show up as props
  //inside of ImageList;
  return {
    images: state.images
  };
}

//Anything returned from this function will end up as props on the ImageList container
function mapDispatchToProps(dispatch){ //second selectImage is the one that was imported above.
  //Whenever selectImage is called the result should be passed to all of our reducers
  return bindActionCreators({ selectImage: selectImage}, dispatch);
}
//the dispatch gets the results of the selectImage (i.e. the action) call and spits it back out to all the reducers in the application.


//To promote ImageList from a component to a container - it needs to know about this new dispatch method, selectImage.
//To make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(ImageList);
//Highly recommends referencing the react-redux documentation
