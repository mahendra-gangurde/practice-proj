import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
 constructor(props,context) {
 super(props,context);

 this.state={
   course: Object.assign({},props.course),
   errors:{}
 };
 this.onTextChange=this.onTextChange.bind(this);
 this.onClickSave=this.onClickSave.bind(this);
 }

 componentWillReceiveProps(nextProps) {

    if(this.props.course.id !== nextProps.course.id)
      this.setState({
        course:Object.assign({},nextProps.course)
      });
 }

 onTextChange(event){

   const field=event.target.name;
   let course=this.state.course;
   course[field]=event.target.value;
   return this.setState({
     course: course
   });
 }

 onClickSave(event){
   //alert(`Saving ${this.state.course.title}`);

    event.preventDefault();
    this.props.courseActions.saveCourse(this.state.course);
    this.context.router.push('/courses');
 }

 createRow(course,index){
    return(<div key={index}>{course.title} </div>);
 }

 render() {

     return (
       <CourseForm course={this.state.course}  allAuthors={this.props.authors} onChange={this.onTextChange} onSave={this.onClickSave}/>
     );
   }
 }

 ManageCoursePage.propTypes = {
   courseActions:PropTypes.object.isRequired,
   course:PropTypes.object.isRequired,
   authors:PropTypes.array
 };


 ManageCoursePage.contextTypes={
   router:PropTypes.object
 };

 function formatAuthorData(authors){
   
   return authors.map(author=>{
     return {
       value:author.id,
       text:author.firstName +' ' +author.lastName
     };
   });
 }

 function mapStateToProps(state,ownProps){

      let course ={id:'',watchHRef:'',title:'',authorId:'',length:'',category:''};
      let loadCourse=state.courses.filter(course=>{ return course.id===ownProps.params.id;});
      return {
         course: loadCourse.length ? loadCourse[0]: course,
         authors: state.authors.length ? formatAuthorData(state.authors) : [{value:'test',text:'test123'}]
         };
  }

 function mapDispatchToProps(dispatch){
   return{
      courseActions:bindActionCreators(courseActions,dispatch)
  };
 }

export default connect(mapStateToProps,mapDispatchToProps)(ManageCoursePage);
