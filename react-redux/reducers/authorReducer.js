import * as Types from '../actions/actionTypes';

export default function authorReducer(state=[],action){

  switch (action.type) {
    case Types.LOAD_AUTHORS_SUCCESS:      
        return action.authors;
    default:
      return state;
  }
}
