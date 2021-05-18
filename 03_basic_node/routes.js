const fs = require('fs');

const requestHandler = (req, res) => {
  // console.log('URL: ', req.url);
  // console.log('Method: ', req.method);
  // console.log('Headers: ', req.headers);

  const url = req.url;
  const method = req.method;

  if (url === '/') {
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

  if (url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('./output/message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
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
};

module.exports = requestHandler;
