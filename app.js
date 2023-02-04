require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const mongoSanitize = require('express-mongo-sanitize')

const User = require('./models/user');

const app = express();

const sessionConfig = {
  name: 'sessid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  //store: change to mongo for deploy
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
if (process.env.NODE_ENV === 'production') {
  sessionConfig.cookie.secure = true;
}

const authRouter=require('./routes/auth')
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const engine = require('ejs-mate');
app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(flash());
app.use(mongoSanitize({  
  replaceWith: '_',
}))

app.use(passport.initialize());
app.use(passport.authenticate('session')); // == app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  if (req.originalUrl !== '/login') {
    req.session.previusUrl = req.originalUrl;
  }
  res.locals.user = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRouter);
app.use('/',authRouter)
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/comments', commentsRouter);

const dbUrl = 'mongodb://localhost:27017/socialMedia';
mongoose.connect(dbUrl).catch((err) => console.log(`mongo connection error ${err}`));

const db = mongoose.connection;
db.on('error', (err) => { 
  console.log(`mongo error ${err}`);
});
db.once('open', () => {
  console.log('Database Connected');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
