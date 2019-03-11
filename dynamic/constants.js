export const MAX_AFFILIATION = 3;

export const AFFILIATION_FIELDS = {
  country: {
    label: 'Country',
    required: true,
    errorMessage: {
      required: 'Country is required'
    },
    default: ''
  },
  city: {
    label: 'City',
    required: true,
    errorMessage: {
      required: 'City is required'
    },
    default: ''
  },
  affiliation: {
    label: 'Affiliation',
    required: true,
    errorMessage: {
      required: 'Affiliation is required'
    },
    default: ''
  },
  address: {
    label: 'Address',
    required: true,
    errorMessage: {
      required: 'Address is required'
    },
    default: ''
  },
  zip: {
    label: 'Zip',
    required: true,
    type: 'number',
    validator: (val) => val.length === 6,
    errorMessage: {
      required: 'Zip is required',
      validator: 'Zip len must be 6'
    },
    default: ''
  }
};

export const USER_FIELDS = {

}