import * as Types from './actionTypes.js';
import AuthorApi from '../api/mockAuthorApi';

export function loadAuthorSuccess(authors){
  return {type:Types.LOAD_AUTHORS_SUCCESS, authors:authors};
}

export function loadAuthors(){

  return dispatch=>{
    return AuthorApi.getAllAuthors().then(authors=>{
      dispatch(loadAuthorSuccess(authors));
    }).catch(error=>{
      throw error;
    });
  };
}
