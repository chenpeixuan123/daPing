var http = require('http');
var path = require('path');
var fs = require('fs')
var url = require('url');
var util = require('util');
var bodyParser = require('body-parser');
var express = require('express'),
    app = express()

var staticPath = "public";
var assetsOutput = path.join(__dirname, staticPath);
var viewsOutput = path.join(__dirname, 'views');

var mainfest = {};
([ 'assets-client.json' ]).forEach(function (name) {
  var content = fs.readFileSync(path.join(assetsOutput, name))
  try {
    manifest = Object.assign(mainfest, JSON.parse(content))
  } catch (e) { }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/' + staticPath, express.static(assetsOutput));


var __IS_DEV__ = (process.env['NODE_ENV'] !== 'production')
if (__IS_DEV__){
    var webpack = require('webpack');
    var config = require('../tools/webpack.config');
    var compiler = webpack(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: false,
        publicPath: config.output.publicPath,
        stats: {
        colors: true
        }
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}



app.set('view engine', 'hbs');
app.set('views', viewsOutput);


app.get("*", function(req, res){
    res.render('index', {
        isDev: __IS_DEV__,
        mainFest: mainfest,
        domainContext: encodeURI(JSON.stringify({
            staticPath
        }))
    })
})

var server = app.listen(9000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});




