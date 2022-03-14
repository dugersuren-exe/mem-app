import actions from './actions';

const { PUPIL_BEGIN, PUPIL_SUCCESS, PUPIL_ERROR,  PUPIL_SEARCH} = actions;

const initialState = {
  list: [],
  filteredList: [],
  loading: false,
  error: null,
  searchText:""
};

const PupilReducer = (state = initialState, action) => {
    
  const { type, data, err } = action;
  //console.log('==========>',data)   
  switch (type) {
    case PUPIL_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
        
      };
    case PUPIL_SUCCESS:   
      return {
        ...state,
        list: data,
        loading: false,
      };     
    case PUPIL_ERROR:
      return {
        ...state,
        error: err,
        loading: false

      };

      case PUPIL_SEARCH:
      console.log(data)
      return {
        ...state,
        searchText:data,
        filteredList: [...state.list.filter((e)=>e.firstName.startsWith(data))]
      };
    
    default:
      return state;
  }
};
export default PupilReducer;



