import React, {PropTypes} from 'react';
import {Link} from 'react-router';
const CourseRow=({course})=>{

  return(
    <tr>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/'+course.id}> {course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td>&nbsp;</td>
    </tr>
  );
};

CourseRow.propTypes={
  course:PropTypes.object.isRequired
};

const CourseList=({courses})=>{
  return(
    <table className="table" styel={{marginRight:'10px'}}>
      <thead>
        <tr>
          <th> </th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
      {
        courses.map(course=> <CourseRow key={course.id} course={course}/>)
      }
      </tbody>
    </table>
  );
};


CourseList.propTypes={
  courses:PropTypes.array.isRequired
};

export default CourseList;
