/**
 * Dockerized Microservice Entrypoint & Health Controller
 */

const http = require('http');

let isShuttingDown = false;
let requestCount = 0;

function formatPrometheusMetrics() {
  const mem = process.memoryUsage();
  return `# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total ${requestCount}

# HELP process_memory_rss_bytes Process RSS memory usage
# TYPE process_memory_rss_bytes gauge
process_memory_rss_bytes ${mem.rss}

# HELP process_heap_used_bytes Process Heap Used memory
# TYPE process_heap_used_bytes gauge
process_heap_used_bytes ${mem.heapUsed}
`;
}

const server = http.createServer((req, res) => {
  requestCount++;
  if (req.url === '/health') {
    if (isShuttingDown) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'SHUTTING_DOWN' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'UP', service: 'dockerized-microservice-starter' }));
    }
  } else if (req.url === '/metrics') {
    res.writeHead(200, { 'Content-Type': 'text/plain; version=0.0.4' });
    res.end(formatPrometheusMetrics());
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.shutdown = function() {
  isShuttingDown = true;
};

server.formatPrometheusMetrics = formatPrometheusMetrics;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Microservice listening on port ${PORT}`);
  });
}

module.exports = server;
