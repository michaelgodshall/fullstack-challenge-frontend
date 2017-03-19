import React from 'react';

// A reusable form field component
const FormField = (props) => {

  // Generate the field element
  let fieldElement;

  if (props.element === 'select') {
    // Generate the options if it's a select field
    const optionElements = props.options.map((option) => {
      return (
        <option value={option.value} key={option.value}>{option.name}</option>
      )
    });
    fieldElement = (
      <select {...props.input} className="form-control">
        <option></option>
        {optionElements}
      </select>
    );
  } else {
    // Default field element
    fieldElement =  (
      <props.element {...props.input} type={props.type} className="form-control" />
    );
  }

  return (
    <div className={`form-group ${props.meta.touched && props.meta.invalid ? 'has-danger': ''}`}>
      <label htmlFor={props.input.name} className="form-control-label">{props.label}</label>
      {fieldElement}
      {props.meta.touched && props.meta.error && <span className="form-control-feedback">{props.meta.error}</span>}
    </div>
  )
};

export default FormField;
