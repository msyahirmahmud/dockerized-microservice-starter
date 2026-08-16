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
});
