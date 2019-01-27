//began on 1/04/2018
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import logins from './logins';

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
       
        document.querySelector('body').classList.remove("bg");
        document.querySelector('body').classList.remove("over-flow");
        document.querySelector('.overlay').classList.remove("overlay");

        document.querySelector('body').classList.add("gallery-bg");
       // document.querySelector("tr span").parentNode.removeChild(document.querySelector("tr span"));

        //console.log(reducers);
        const createStoreWithMiddleware = applyMiddleware()(createStore);
        ReactDOM.render(
          <Provider store={createStoreWithMiddleware(reducers)}>
            <Router history={browserHistory} routes={routes} />
          </Provider>
          , document.querySelector('.app-container')
        );
        //removes rogue dynamilcally created span causing an error to be thrown
        document.querySelector("tr span").parentNode.removeChild(document.querySelector("tr span"));
      }
    }
  );

  if(localStorage.getItem('loggedIn')){
    const loader = <h1> Loading... </h1>
    ReactDOM.render(loader, document.querySelector('.app-container'));   
  }else{
    // const element = <div>
    //     <button className="btn"> <a href="http://localhost:5000/auth/google">Sign in with Google</a> </button> <br></br><br></br>
    //     <button className="btn"> <a href="http://localhost:5000/auth/github">Sign in with GitHub</a> </button><br></br><br></br>
    //     <button className="btn"> <a href="http://localhost:5000/auth/twitter">Sign in with Twitter</a> </button>
    // </div>;
      
    ReactDOM.render(logins, document.querySelector('.app-container'));
  }
 

