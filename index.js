const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 5005;

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      return res.end;
    });
  } else {
    const pages = ['about.html', 'contact-me.html'];
    let reqestedFile = `${req.url.split('/')[1]}.html`
    let responseCode = 200;
    if (!pages.includes(reqestedFile)) {
      reqestedFile = '404.html';
      responseCode = 404;
    }
    fs.readFile(reqestedFile, (err, data) => {
      if (err) throw err;
      res.writeHead(responseCode, { 'Content-type': 'text/html' });
      res.write(data);
      return res.end;
    })
  }
}
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}.`);
})