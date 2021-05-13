const http = require('http');
const server = http.createServer((req, res) => {
  console.log('URL: ', req.url);
  console.log('Method: ', req.method);
  console.log('Headers: ', req.headers);
});
server.listen(3000);
