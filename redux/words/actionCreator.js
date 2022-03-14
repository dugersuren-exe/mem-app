import actions from './actions';
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



export {getAllWords };

