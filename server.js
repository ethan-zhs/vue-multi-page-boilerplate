const Express = require('express');
const http = require('http');
const path = require('path');
const webpack = require('webpack');
const opn = require('opn');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./build/webpack.dev.config');

// default port where dev server listens for incoming traffic
const PORT = process.env.PORT || 80;

const app = Express();
const compiler = webpack(webpackConfig);


// serve webpack bundle output
app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware(compiler, {
    heartbeat: 5000
}));

app.use('/lib', Express.static(path.join(__dirname, './src/lib')));
app.use('/statics', Express.static(path.join(__dirname, './src/statics')));
app.get('/*', function (req, res, next) {
    next();
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, function httpS() {
    const url = 'http://localhost:' + PORT;
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
    opn(url);
});
