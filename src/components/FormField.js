import React from 'react';

// A reusable form field component
const FormField = (props) => {
  return (
    <div className={`form-group ${props.meta.touched && props.meta.invalid ? 'has-error': ''}`}>
      <label htmlFor={props.input.name} className="control-label">{props.label}</label>
      <props.element {...props.input} type={props.type} className="form-control" />
      {props.meta.touched && props.meta.error && <span className="help-block">{props.meta.error}</span>}
    </div>
  )
};

export default FormField;
