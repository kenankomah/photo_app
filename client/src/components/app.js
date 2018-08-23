import React from 'react'; //imports the whole React object from the react file
import {Component} from 'react'; //the use of curly braces meansthat we are only importing a single property

import ImageList from '../containers/image-list';
import ImageDetail from '../containers/image-detail';

export default class App extends Component {
  //this.props.children is to render any child element in the Router

  render() {
    return (
      <div>
         {this.props.children}
      </div>
    );
  }
}
