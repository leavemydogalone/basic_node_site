var http = require('http');
var url = require('url');
var fs = require('fs');

http
  .createServer(function (req, res) {
    var baseURL = 'http://' + req.headers.host + '/';

    var myURL = new URL(req.url, baseURL);

    const fileName = myURL.pathname === '/' ? '/index' : myURL.pathname;

    // const index = myURL.pathname === '/' && '/index';
    const pathName = '.' + fileName + '.html';

    console.log(fileName);
    fs.readFile(pathName, function (err, data) {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('404 Not Found');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
