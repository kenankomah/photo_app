//began on 1/04/2018
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import logins from './logins';

//import App from './components/app';
import { combineReducers } from 'redux';
import ImagesReducer from './reducers/reducer_images';
import ActiveImage from './reducers/reducer_active_image';

// the function below is a reducer
function returnArray(state = [], action){
   if(action.type === 'IMAGE_LIST'){
     return action.payload;
   }
   return state;
}

function ActiveUser(state = [], action){
   if(action.type === 'USER_DATA'){
     return action.payload;
   }
   return state;
}

ImagesReducer().payload
  .then(posts => {
       
    if(posts){
      var d = new Date();
      d.setTime(d.getTime() + 24*60*60*1000);
      d.toGMTString();

      
      if(!document.cookie.includes("gallery_session=true")){
         document.cookie = "gallery_session=true; expires=" + d.toGMTString() + "; path=/";
      }

      
      const reducers = combineReducers({
          images: returnArray,
          activeImage: ActiveImage,
          activeUser: ActiveUser
        });
       
        document.querySelector('body').classList.remove("bg");
        document.querySelector('body').classList.remove("over-flow");
        document.querySelector('.overlay').classList.remove("overlay");
        document.querySelector('body').classList.add("gallery-bg");     

      
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

  if(document.cookie.includes("gallery_session=true")){
      const loader = <img id="loader" src='../assets/wait.gif'></img>
      ReactDOM.render(loader, document.querySelector('.app-container'));   
  }else{
      ReactDOM.render(React.createElement(logins), document.querySelector('.app-container'));
  }
 

