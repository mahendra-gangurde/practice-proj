import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseAction';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';


class CoursePage extends React.Component{
  constructor(props,context){
    super(props,context);
    this.state={
      course:{title:""}
    };
  }

  redirectToManageCoursePage(){
    browserHistory.push('/course');
  }

  render(){
      return(
        <div>
          <div>
            <br/>
            <h1>Courses</h1>
            <div className="courseList" style={{height : '380px',borderBottom:'1px solid gray',marginBottom:'10px'}}>
            <CourseList courses={this.props.courses}/>
            </div>
            <input value="Add Course" className="btn btn-primary" onClick={this.redirectToManageCoursePage} type="button" style={{float : 'right'}}/>
          </div>
        </div>
      );
    }
  }

CoursePage.propTypes={
  courseActions:PropTypes.object.isRequired,
  courses:PropTypes.array.isRequired
};

function mapStateToProps(state,ownProps){
  return {
    courses:state.courses
  };
}

function mapDispatchToProps(dispatch){
  return {
//    createCourse:(course)=>dispatch(courseActions.createCourse(course))
      courseActions:bindActionCreators(courseActions,dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursePage);
