const session = require('express-session');

module.exports = app => {
    app.set('trust proxy', 1) // trust first proxy
    app.use(session({
        secret: process.env.SESSION_SECRECT || 'testSecrect',
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