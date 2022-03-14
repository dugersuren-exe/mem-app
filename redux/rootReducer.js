import { combineReducers } from "redux";

//import All reducers 
import  WordsReducer  from "./words/reducers";
import  PupilReducer  from "./pupil/reducers";
//import AuthReducer from "./authentication/reducers";

export default combineReducers({
  words: WordsReducer,
  //auth:AuthReducer,
  pupil:PupilReducer,
});
