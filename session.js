import session from 'express-session';
import connfigSqStore from 'connect-session-sequelize';
import { sequelize } from './database/models';

const SequelizeStore = connfigSqStore(session.Store);

const sessionStore = new SequelizeStore({
  db: sequelize
});

export default session({
  key: 'user_sid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
});
