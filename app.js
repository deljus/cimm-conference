import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';
import routes from './routes';
import sessionConfig, { sessionStore } from './utils/session';
import { sequelize } from './database/models';
import fileUpload from 'express-fileupload';
import { config } from './utils/globalConfig';

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

app.use(sessionConfig);

app.use(fileUpload());

app.use(config.routePrefix, express.static(path.join(__dirname, 'public')));

// Routes
app.use(config.routePrefix, routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

sequelize.sync().then(() => {
  console.log('Nice! Database looks fine');
}).catch((err) => {
  console.log(err, 'Something went wrong with the Database Update!');
});

export default app;
