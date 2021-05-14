const http = require('http');
const server = http.createServer((req, res) => {
  console.log('URL: ', req.url);
  console.log('Method: ', req.method);
  console.log('Headers: ', req.headers);

  if (req.url === '/') {
    res.write('<html>');
    res.write('<header>');
    res.write('<title>Input Page');
    res.write('</title>');
    res.write('</header>');
    res.write('<body>');
    res.write('<form action="/message" method="POST">');
    res.write('<input name="message">');
    res.write('<button>Submit');
    res.write('</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

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
