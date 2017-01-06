import * as Types from '../actions/actionTypes';

export default function courseReducer(state=[],action){
  switch (action.type) {
    case Types.CREATE_COURSE:
        return [...state,Object.assign({},action.course)];
    case Types.LOAD_COURSES_SUCCESS:
        return action.courses;
    case Types.SAVE_COURSE_SUCCESS:
        return [...state,Object.assign({},action.course)];
    case Types.UPDATE_COURSE_SUCCESS:    
    /*let courses=[...state];
    return courses.filter(course=>{
            if(course.id!==action.course.id){
              return Object.assign({},action.course);
            }
            return course;
          });

    return courses;*/
        return [...state.filter(course=>course.id!==action.course.id),
                Object.assign({},action.course)];
    default:
      return state;
  }
}
