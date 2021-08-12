const http = require('http');
const product = require('./product.json');

http
  .createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var url = req.url;
    try {
      if (url === '/product/26') {
        console.log('product called at ' + new Date().toISOString());
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
  .listen(3001, function () {
    console.log('server start at port 3001');
  });
