const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://git.heroku.com/travelplanetserver.git',
            changeOrigin: true,
        })
    );
};

// original target: 'http://localhost:5000'