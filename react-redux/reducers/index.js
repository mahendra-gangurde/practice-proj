//Root reducer is by default a index.js
//combineReducers to combine multiple reducers
import {combineReducers} from 'redux';
//courses is alias for courseReducer as courseReducer is exported by default
import courses from './courseReducer';
import authors from './authorReducer';
//ES6 shorthand property. i.e right hand side will automatically map to left hand side property
const rootReducer=combineReducers({
  courses,
  authors
});

export default rootReducer;
