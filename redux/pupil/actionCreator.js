//import axios from '../../utils/axios';
import actions from './actions';
import initialState from '../../data/pupil.json';


const { pupilBegin, pupilSuccess, pupilError } = actions;

/*
const pupilGet = () => {
  
  return async dispatch => {
    try {
      dispatch(pupilBegin());
      
      await axios.get("pupils").then(({data}) => {  
        dispatch(pupilSuccess(data))
      });
    } catch (err) {
      dispatch(pupilError(err));
    }

  };
};

*/

const pupilJsonDatas = () => {
  return async dispatch => {
    try {
      dispatch(pupilBegin());
      dispatch(pupilSuccess(initialState));
    } catch (err) {
      dispatch(pupilError(err));
    }
  };
};

export {/* pupilGet,*/ pupilJsonDatas };

