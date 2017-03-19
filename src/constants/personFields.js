// Person form field definitions
const PERSON_FIELDS = {
  first_name: {
    element: 'input',
    label: 'First name',
    type: 'text'
  },
  last_name: {
    element: 'input',
    label: 'Last name',
    type: 'text'
  },
  email: {
    element: 'input',
    label: 'Email',
    type: 'email'
  },
  age: {
    element: 'input',
    label: 'Age',
    type: 'number'
  },
  gender: {
    element: 'input',  // TODO Figure out select input for gender
    label: 'Gender',
    type: 'text'
  }
};

export default PERSON_FIELDS;
