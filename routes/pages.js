const express = require('express');

// ## 5 - REQUIRES USER CLASS
const User = require('../core/user');

const router = express.Router();

// ## 5 - Creates a new user
const user = new User();

// Get index page
router.get('/', (req, res, next) => {
    
    //## PART 10 - USER INFO ON INDEX
    let user = req.session.user;
    if(user)
    {
        res.redirect('/home');
        return;
    }
    //## END PART 10 - USER INFO ON INDEX

    res.render('index', { title: "Authentication Demo" });

});

// ## PART 2 - HOME ROUTE Get Home Page
router.get('/home', (req, res, next) => {
    //## PART 2 - HOME ROUTE Get Home Page
    //res.send('Congratulations! You successfully login in into our system');

    // ## PART 9 - USER INFO ON WEBPAGE
    let user = req.session.user;
    if(user)
    {
        res.render('home', {opp: req.session.opp, name:user.fullname});
        return;
    }
    // if no section redicrect to index
    res.redirect('/');
    // END ## PART 9 - USER INFO ON WEBPAGE

});

// ## PART 3 - POST LOGIN DATA
router.post('/login', (req, res, next) => {
    
    // ## INICIAL CODE
    //res.json(req.body);

    //##6 - CHANGE LOGIN POST DATA
    user.login(req.body.username, req.body.password, function(result) {
        if(result)
        {
            //## PART 8 - MAKE A SESSION
            // if we log in make a session and save user data
            req.session.user = result;
            req.session.opp = 1; // 1 for login and 0 for register
            res.redirect('/home');

            //##6 - CHANGE LOGIN POST DATA
            //res.send('Logged in as: ' + result.username);
        }
        else
        {
            res.send('Username/Password incorrect');
        }
    });
});

// ## 4 - POST REGISTER DATA
router.post('/register', (req, res, next) => {
    
    // ## INICIAL CODE
    //res.json(req.body);

    //##7 - CHANGE REGISTER POST DATA
    let newUser = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };

    user.create(newUser, function(lastId){
        if(lastId)
        {
            //## PART 8 - MAKE A SESSION
            user.find(lastId, function(result){
                req.session.user = result,
                req.session.opp = 0,
                res.redirect('/home');
            });
            
            //##7 - CHANGE REGISTER POST DATA
            //res.send("Welcome " + newUser.username);
        }
        else
        {
            console.log('Error creating a new user');
        }
    });
});

// ## PART 11 - LOGOUT
router.get('/logout', (req, res, next) => {
    if(req.session.user)
    {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router; 