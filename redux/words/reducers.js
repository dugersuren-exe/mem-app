import actions from './actions';

const { WORDS_LOADING, WORDS_SUCCESS, WORDS_ERROR} = actions;

const initialState = {
  list: [],
  loading: false,
  error: null
};

const WordsReducer = (state = initialState, action) => {
    
  const { type, data, err } = action;
  //console.log('==========>',data)   
  switch (type) {
    case WORDS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        
      };
    case WORDS_SUCCESS:   
      return {
        ...state,
        list: data,
        loading: false,
      };     
    case WORDS_ERROR:
      return {
        ...state,
        error: err,
        loading: false

      };
    
    default:
      return state;
  }
};
export default WordsReducer;



