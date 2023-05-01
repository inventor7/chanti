const { createServer } = require('http');

const server = createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Set response content type
  res.setHeader('Content-Type', 'application/json');

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle GET requests
  if (req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Hello, world!' }));
    return;
  }

  // Handle POST requests
  if (req.method === 'POST') {
    // Parse JSON payload
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      const payload = JSON.parse(data);
      res.writeHead(200);
      res.end(JSON.stringify({ message: `Hello, ${payload.name}!` }));
    });
    return;
  }

  // Handle unsupported requests
  res.writeHead(405);
  res.end(JSON.stringify({ message: 'Method not allowed' }));
});

exports.handler = (event, context, callback) => {
  // Proxy requests to serverless function
  server.emit('request', event, context, callback);
};
