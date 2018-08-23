//State argument is not application state, only the state
//this reducer is responsible for
export default function(state = null, action){
  //console.log(action);
  switch(action.type){
  case 'IMAGE_SELECTED':
    return action.payload;
  }
  return state;
}
