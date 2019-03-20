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
  }
};
