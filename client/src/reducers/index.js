/*import { combineReducers } from 'redux';
import ImagesReducer from './reducer_images';
import ActiveImage from './reducer_active_image';



ImagesReducer().payload
  .then(posts => {
    const arr = [];
      posts.data.map( el => {
      arr.push({src:el.src, dates:el.dates});
    })
    //console.log(arr);
    return arr;
  });



const rootReducer = combineReducers({
  images: ImagesReducer,
  activeImage: ActiveImage
});

export default rootReducer;
*/
