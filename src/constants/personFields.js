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
    element: 'select',
    label: 'Gender',
    options: [
      {value: 'f', name: 'Female'},
      {value: 'm', name: 'Male'}
    ]
  }
};

export default PERSON_FIELDS;
