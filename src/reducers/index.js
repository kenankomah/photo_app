import { combineReducers } from 'redux';
import ImagesReducer from './reducer_images';
import ActiveImage from './reducer_active_image';

const rootReducer = combineReducers({
  images: ImagesReducer,
  activeImage: ActiveImage
});

export default rootReducer;
