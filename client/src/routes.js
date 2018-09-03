import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import ImageDetail from './containers/image-detail';
import ImageList from './containers/image-list';

//import PostsShow from './components/posts_show';

console.log(ImageDetail);
//  <Route path="greet" component={Greeting} /> // gets passed to App as this.props.children
export default (
  <Route path="/" component={App}> //any child elements are passed to App as this.props.children
    <IndexRoute component={ImageList} />
    <Route path="list" component={ImageDetail} />
  </Route>
);

// "/"  refers to the root directory e.g. homepage
// this.props.params.id is passed into the PostsShow component as a prop
