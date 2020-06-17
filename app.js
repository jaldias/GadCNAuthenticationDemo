const express = require('express');

// ##PART 5 - SESSION
const session = require('express-session');

const path = require('path');

// ##### PART 3 - Quando fizermos o ficheiro routes -> pages.js
const pageRouter = require('./routes/pages')

const app = express();
// for body parser
app.use(express.urlencoded({ extended: false }));

// import static files
app.use(express.static(path.join(__dirname, 'public')));

// set templates engine files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// PART 2 - serve the index page
/*app.get('/', function(req, res){
    res.render('index');
});*/

//##PART 5 - SESSION
app.use(session({
    secret: "authentication_session",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 * 30 }
}));

// ##### PART 3 - Quando fizermos o ficheiro routes -> pages.js
// routers
app.use('/', pageRouter);

// "##### PART 4 - Handle errors"
// 404 -> page not found
app.use((req, res, next) => {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
});
// handling other errors
app.use((req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// setting up the server
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

module.exports = app;