// Vehicle form field definitions
const VEHICLE_FIELDS = {
  year: {
    element: 'input',
    label: 'Year',
    type: 'number'
  },
  make: {
    element: 'input',
    label: 'Make',
    type: 'text'
  },
  model: {
    element: 'input',
    label: 'Model',
    type: 'text'
  },
  license_plate: {
    element: 'input',
    label: 'License plate',
    type: 'text'
  },
  person: {
    element: 'select',
    label: 'Person',
    options: [] // Populate persons in component
  }
};

export default VEHICLE_FIELDS;
