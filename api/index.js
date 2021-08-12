const http = require('http');
const fs = require('fs');
const user = require('./user.json');
const product = require('./product.json');
const logfile = './api/log.txt';

http
  .createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var url = req.url;
    try {
      if (url === '/user') {
        console.log('user called at ' + new Date().toISOString());
        fs.appendFile(
          logfile,
          'user called at ' + new Date().toISOString() + '\n',
          function(err) {
            if (err) throw err;
          }
        );
        res.end(JSON.stringify(user, null, 3));
      } else if (url === '/product/26') {
        console.log('product called at ' + new Date().toISOString());
        fs.appendFile(
          logfile,
          'product called at ' + new Date().toISOString() + '\n',
          function(err) {
            if (err) throw err;
          }
        );
        res.end(JSON.stringify(product, null, 3));
      } else {
        res.write(
          JSON.stringify({ data: 'Welcome to JSON test data server.' })
        );
        res.end();
      }
    } catch (e) {
      console.log(e.message);
    }
  })
  .listen(3001, function() {
    console.log('server start at port 3001');
  });
