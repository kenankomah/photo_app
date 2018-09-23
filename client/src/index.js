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
  // console.log(action)
   if(action.type === 'USER_DATA'){
     return action.payload;
   }
   return state;
}
console.log(ImagesReducer().payload);
ImagesReducer().payload
  .then(posts => {
    if(posts){
      //replace local storage with a cookie that has the same life span as Passport's session cookie
      localStorage.setItem('loggedIn',true);
      const reducers = combineReducers({
          images: returnArray,
          activeImage: ActiveImage,
          activeUser: ActiveUser
        });
        //console.log(reducers);
        const createStoreWithMiddleware = applyMiddleware()(createStore);
        ReactDOM.render(
          <Provider store={createStoreWithMiddleware(reducers)}>
            <Router history={browserHistory} routes={routes} />
          </Provider>
          , document.querySelector('.container')
        );
      }
    }
  );

  if(localStorage.getItem('loggedIn')){
    const loader = <h1> Loading... </h1>
    ReactDOM.render(loader, document.querySelector('.container'));   
  }else{
    const element = <button className="btn"> <a href="http://localhost:5000/auth/google">Log in</a> </button>;
    ReactDOM.render(element, document.querySelector('.container'));
  }

