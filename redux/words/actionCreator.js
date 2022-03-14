//import axios from '../../utils/axios';
import actions from './actions';
import initialState from '../../data/pupil.json';
import axios from 'axios'

const { wordsLoading, wordsSuccess, wordsError } = actions;


const getAllWords = () => {
  
  return async dispatch => {
    try {
      dispatch(wordsLoading());
      await axios.get("http://localhost:3000/api/words").then(({data}) => {          
        dispatch(wordsSuccess(data.list))
      });
    } catch (err) {
      dispatch(wordsError(err));
    }

  };
};



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

export {getAllWords, pupilJsonDatas };

