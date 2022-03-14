const actions = {
  PUPIL_BEGIN: 'PUPIL_BEGIN',
  PUPIL_ERROR: 'PUPIL_ERROR',
  PUPIL_SUCCESS: 'PUPIL_SUCCESS',
  PUPIL_SEARCH: 'PUPIL_SEARCH',

  pupilBegin: () => {
    return {
      type: actions.PUPIL_BEGIN,
    };
  },

  pupilSuccess: data => {
    return {
      type: actions.PUPIL_SUCCESS,
      data,
    };
  },

  pupilError: err => {
    return {
      type: actions.PUPIL_ERROR,
      err,
    };
  },
  
  pupilSearch: (data) => {
    return {
      type: actions.PUPIL_SEARCH,
      data,
    };
  },

};

export default actions;
