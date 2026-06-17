const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const routes = {
  '/sitemap.xml': { file: 'sitemap.xml', type: 'application/xml; charset=utf-8' },
  '/robots.txt': { file: 'robots.txt', type: 'text/plain; charset=utf-8' },
};

const server = http.createServer((req, res) => {
  const route = routes[req.url];
  const fileName = route ? route.file : 'index.html';
  const contentType = route ? route.type : 'text/html; charset=utf-8';

  const filePath = path.join(__dirname, fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`kokoro-man.com running on port ${PORT}`);
});
