export const config = {
  routePrefix: ''
};

export const insideRoutes = {
  thesis: {
    create: '/thesis/create',
    edit: '/thesis/edit/:id',
    list: '/thesis/list',
    show: '/thesis/show/:id'
  }
};

export const apiRoutes = {
  login: '/api/login',
  registration: '/api/registration',
  user: {
    current: '/api/user',
    all: '/api/users'
  },
  affiliation: {
    current: '/api/affiliation',
    all: '/api/affiliations',
    forCurrentUser: '/api/affiliation/current',
    boundForUser: '/api/affiliation/bound'
  },
  thesis: {
    all: '/api/thesis/all',
    current: '/api/thesis'
  }
};
