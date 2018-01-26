const session = require('express-session');

module.exports = app => {
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: 'a',
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: null
        },
        proxy: true,
    }));
}