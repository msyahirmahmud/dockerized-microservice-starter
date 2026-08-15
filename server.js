const http = require('http');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'UP', uptime: process.uptime(), memory: process.memoryUsage() }));
  } else if (req.url === '/api/info') {
    res.writeHead(200);
    res.end(JSON.stringify({ name: 'Dockerized Microservice', version: '1.0.0', env: process.env.NODE_ENV || 'development' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

if (require.main === module) {
  server.listen(PORT, () => console.log(`Docker Microservice listening on port ${PORT}`));
}

module.exports = server;
