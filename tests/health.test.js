const assert = require('assert');
const { test, describe } = require('node:test');
const server = require('../server.js');

describe('Dockerized Microservice Health Unit Tests', () => {
  test('server exports valid HTTP server listener', () => {
    assert.notStrictEqual(server, null);
    assert.strictEqual(typeof server.listen, 'function');
  });

  test('server supports graceful shutdown state handler', () => {
    assert.strictEqual(typeof server.shutdown, 'function');
    server.shutdown();
  });

  test('server formats Prometheus metrics text format', () => {
    const metrics = server.formatPrometheusMetrics();
    assert.strictEqual(metrics.includes('http_requests_total'), true);
    assert.strictEqual(metrics.includes('process_memory_rss_bytes'), true);
  });
});
