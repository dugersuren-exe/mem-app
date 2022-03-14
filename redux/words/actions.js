const actions = {
  WORDS_LOADING: 'WORDS_LOADING',
  WORDS_SUCCESS: 'WORDS_SUCCESS',
  WORDS_ERROR: 'WORDS_ERROR',

  wordsLoading: () => {
    return {
      type: actions.WORDS_LOADING,
    };
  },

  wordsSuccess: data => {
    return {
      type: actions.WORDS_SUCCESS,
      data,
    };
  },

  wordsError: err => {
    return {
      type: actions.WORDS_ERROR,
      err,
    };
  },
  

};

export default actions;
