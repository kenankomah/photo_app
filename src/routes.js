import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import BookDetail from './containers/book-detail';
import BookList from './containers/book-list';

//import PostsShow from './components/posts_show';


//  <Route path="greet" component={Greeting} /> // gets passed to App as this.props.children
export default (
  <Route path="/" component={App}> //any child elements are passed to App as this.props.children
    <IndexRoute component={BookList} />
    <Route path="list" component={BookDetail} />
  </Route>
);

// "/"  refers to the root directory e.g. homepage
// this.props.params.id is passed into the PostsShow component as a prop
