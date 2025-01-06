const http = require('http');

// Create server
const server = http.createServer((req, res) => {
    // Set the response HTTP header with status and content type
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    // Send data using res.write
    res.write("hello\n");
    
    // End the response
    res.end('Hello, World!\n');
  });

// Specify the port and hostname
const hostname = '127.0.0.1'; // Localhost
const port = 3000;

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
