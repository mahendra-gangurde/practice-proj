import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm=({course,allAuthors,onSave,onChange,saving,errors})=>{
  return(
    <form>
        <h1>Manage Course</h1>
          <TextInput name="title" label="Title"  placeholder="Title" value={course.title} onChange={onChange} />
          <SelectInput name="authorId" label="Author" value={course.authorId} defaultOption="Select Author" options={allAuthors} onChange={onChange}/>
          <TextInput name="category" label="Category"  placeholder="Category" value={course.category} onChange={onChange} />
          <TextInput name="length" label="Length"  placeholder="Length" value={course.length} onChange={onChange} />
          <input type="submit" className="btn btn-primary" value="Save" onClick={onSave}/>
    </form>
  );
};


CourseForm.propTypes={
    course : PropTypes.object.isRequired,
    allAuthors : PropTypes.array,
    onSave : PropTypes.func.isRequired,
    onChange : PropTypes.func.isRequired,
    errors : PropTypes.object,
    saving : PropTypes.func
};

export default CourseForm;
