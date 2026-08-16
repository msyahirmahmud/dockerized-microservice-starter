/**
 * Dockerized Microservice Entrypoint & Health Controller
 */

const http = require('http');

let isShuttingDown = false;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    if (isShuttingDown) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'SHUTTING_DOWN' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'UP', service: 'dockerized-microservice-starter' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.shutdown = function() {
  isShuttingDown = true;
};

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Microservice listening on port ${PORT}`);
  });
}

module.exports = server;
