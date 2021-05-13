console.log('Hello from Node js');

const fs = require('fs');
fs.writeFileSync('./output/hello.txt', 'Hello from Node js again');
