export function selectImage(image){
  //selectImage is an ActionCreator,it needs to return an action,
  //an object with a type property.
  return {
    type:'IMAGE_SELECTED',
    payload: image
  };
}
