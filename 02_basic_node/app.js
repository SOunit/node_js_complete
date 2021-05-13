const http = require('http');
const server = http.createServer((req, res) => {
  console.log('URL: ', req.url);
  console.log('Method: ', req.method);
  console.log('Headers: ', req.headers);

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<header>');
  res.write('<title>Node Page');
  res.write('</title>');
  res.write('</header>');
  res.write('<body>');
  res.write('<h1>Node Page');
  res.write('</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});
server.listen(3000);
