var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var utils = require('./utils');
var open = require('open');

module.exports = function (dir) {
    dir = dir || '.';
    var app = express();
    var router = express.Router();
    var config = utils.loadConfig(dir);
    var url = "http://127.0.0.1:" + config.port;
    app.use('/assets', serveStatic(path.resolve(dir, 'assets')));
    app.use(router);
    router.get('/posts/*', function (req, res, next) {
        var name = utils.stripExtname(req.params[0]);
        var file = path.resolve(dir, '_posts', name + '.md');
        var html = utils.renderPost(dir, file);
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(html);
    });

    router.get('/', function (req, res, next) {
        var html = utils.renderList(dir);
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(html);
    });
    app.listen(config.port, function () {
        console.log("server is listening port of " + config.port + " ....")
    });
    open(url);
}