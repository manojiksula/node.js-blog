const express = require('express');
const app = express();

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/passport')(passport);

const connection = require('./config/connection');

mongoose.connect(connection, {
    useNewUrlParser: true
}, () => console.log('Connected to MongoDB'));

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});

app.use('/articles', require('./routes/articles'));
app.use('/user', require('./routes/users'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
});