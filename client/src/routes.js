import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import ImageDetail from './containers/image-detail';
import ImageList from './containers/image-list';
import Upload from './containers/upload';
import Filters from './containers/filters';


export default (
  <Route path="/" component={App}> //any child elements are passed to App as this.props.children
    <IndexRoute component={ImageList} />
    <Route path="list" component={ImageDetail} />
    <Route path="upload" component={Upload} />
    <Route path="filters" component={Filters} />
  </Route>
);
