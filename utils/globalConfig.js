import validation from 'validator';
import json from '../exampleConfig.json';

export const insideRoutes = {
  thesis: {
    create: '/thesis/create',
    edit: '/thesis/edit/:id',
    list: '/thesis/list',
    show: '/thesis/show/:id'
  },
  admin: {
    page: {
      create: '/pages/create',
      edit: '/pages/edit/:id',
      list: '/pages/list'
    }
  }
};

export const outsideRouters = {
  index: '/',
  profile: '/profile',
  changePassByEmail: '/change-pass-email',
  changePass: '/change-pass',
  page: '/:url',
  users: '/users',
  registration: '/registration',
  login: '/login',
  logout: '/logout',
  send: '/send'
};

export const apiRoutes = {
  login: '/api/login',
  registration: '/api/registration',
  profileFullness: '/api/profile/fullness',
  changePassByEmail: '/api/change-pass-email',
  changePass: '/api/change-pass',
  user: {
    current: '/api/user',
    all: '/api/users'
  },
  affiliation: {
    create: '/api/affiliation',
    forCurrentUser: '/api/affiliations/user',
    me: '/api/affiliations/me',
    all: '/api/affiliations/all',
    boundForMe: '/api/affiliations/bound'
  },
  thesis: {
    me: '/api/thesis/me',
    all: '/api/thesis/all',
    meToId: '/api/thesis/:id'
  },
  uploadFile: '/upload',
  page: {
    all: '/api/page/all',
    meToId: '/api/page/:id',
    create: '/api/page/create'
  }
};

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

export const AUTHOR_FIELDS = {
  lastName: {
    label: 'Last name',
    required: true,
    errorMessage: {
      required: 'Last name is required'
    },
    default: ''
  },
  firstName: {
    label: 'First name',
    required: true,
    errorMessage: {
      required: 'First name is required'
    },
    default: ''
  },
  email: {
    label: 'Email',
    required: true,
    validator: validation.isEmail,
    errorMessage: {
      required: 'Affiliation is required',
      validator: 'Please enter a valid email'
    },
    default: ''
  }
};

// For database

export const config = json;

export const DBConfig = json.db[process.env.NODE_ENV || 'development'];
