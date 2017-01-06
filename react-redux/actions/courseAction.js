import * as Types from './actionTypes.js';
import courseApi from '../api/mockCourseApi';
import toastr from 'toastr';
//old action. won't be used
export function createCourse(course){
  return{type:'CREATE_COURSE',course};
}

export function loadCoursesSuccess(courses){
  return {type:Types.LOAD_COURSES_SUCCESS, courses};
}

export function saveCourseSuccess(savedCourse){
  return {type:Types.SAVE_COURSE_SUCCESS,course:savedCourse};
}

export function updateCourseSuccess(savedCourse){
  return {type:Types.UPDATE_COURSE_SUCCESS,course:savedCourse};
}

export function loadCourses(){
  //thunk which returns a function that accepts a dispach
  return (dispatch)=>{
    return courseApi.getAllCourses().then((courses)=>{
      dispatch(loadCoursesSuccess(courses));
    }).catch((error)=>{
      throw(error);
    });
  };
}

export function saveCourse(course){  
  return (dispatch,getState)=>{
    return  courseApi.saveCourse(course).then(savedCourse=>{
        course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(saveCourseSuccess(savedCourse));
        toastr.success(course.id ? `Updated course : ${course.title}` :`Added course :${course.title}`);
      });
  };
}
