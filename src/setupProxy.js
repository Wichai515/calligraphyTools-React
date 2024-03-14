//npm install http-proxy-middleware --save

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://nas.wichaipan.cn',
            changeOrigin: true,
        })
    );
};
