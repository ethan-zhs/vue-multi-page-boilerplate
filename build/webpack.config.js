const isProd = process.env.NODE_ENV == 'production';
const isTest = process.env.NODE_ENV == 'test';

module.exports = isProd ? require('./webpack.prod.config') : isTest ? require('./webpack.test.config') : require('./webpack.dev.config');
