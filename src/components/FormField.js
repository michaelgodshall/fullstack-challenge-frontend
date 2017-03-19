import React from 'react';

// A reusable form field component
const FormField = (props) => {
  return (
    <div className={`form-group ${props.meta.touched && props.meta.invalid ? 'has-danger': ''}`}>
      <label htmlFor={props.input.name} className="form-control-label">{props.label}</label>
      <props.element {...props.input} type={props.type} className="form-control" />
      {props.meta.touched && props.meta.error && <span className="form-control-feedback">{props.meta.error}</span>}
    </div>
  )
};

export default FormField;
