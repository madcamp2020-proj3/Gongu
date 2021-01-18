const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy('/users', {
            target: 'http://192.249.18.236:3001/'
        })
    );
    app.use(
        proxy('/signup', {
            target: 'http://192.249.18.236:3001/'
        })
    );
    app.use(
        proxy('/login', {
            target: 'http://192.249.18.236:3001/'
        })
    );
    app.use(
        proxy('/makeroom', {
            target: 'http://192.249.18.236:3001/'
        })
    );
    app.use(
        proxy('/entrance', {
            target: 'http://192.249.18.236:3001/'
        })
    );
    app.use(
        proxy('/chatrom/:roomId', {
            target: 'http://192.249.18.236:3001/'
        })
    );
    app.use(
        proxy('/mypage', {
            target: 'http://192.249.18.236:3001/'
        })
    );
    app.use(
        proxy('/exit/chatrom/:roomId/:userId', {
            target: 'http://192.249.18.236:3001/'
        })
    );
}