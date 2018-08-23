//began on 1/04/2018
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import App from './components/app';
//import reducers from './reducers';


import { combineReducers } from 'redux';
import ImagesReducer from './reducers/reducer_images';
import ActiveImage from './reducers/reducer_active_image';

// the function below is a reducer
function returnArray(state = [], action){
   //console.log(action)
   if(action.type === 'IMAGE_LIST'){
     return action.payload;
   }
   return state;
}

function ActiveUser(state = [], action){
   console.log(action)
   if(action.type === 'USER_DATA'){
     return action.payload;
   }
   return state;
}

ImagesReducer().payload
  .then(posts => {
    //console.log(posts);
   const reducers = combineReducers({
      images: returnArray,
      activeImage: ActiveImage,
      activeUser: ActiveUser
    });
  //  console.log(reducers);
    const createStoreWithMiddleware = applyMiddleware()(createStore);
      ReactDOM.render(
          <Provider store={createStoreWithMiddleware(reducers)}>
             <Router history={browserHistory} routes={routes} />
          </Provider>
          , document.querySelector('.container')
    );
  });
