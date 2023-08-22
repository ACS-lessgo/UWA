// const express = require('express');
// const app = express();
// const jsonServer = require('json-server');
// const path = require('path');

// // Create a json-server router
// const jsonRouter = jsonServer.router('db.json');

// // Handle API requests
// app.use('/posts', jsonRouter);

// // Serve static files from the "client" directory
// const clientPath = path.join(__dirname, 'client');
// app.use(express.static(clientPath));

// // Serve JavaScript files with the appropriate MIME type
// app.get('/UWADatagridView.js', (req, res) => {
//   res.sendFile(path.join(clientPath, 'UWADatagridView.js')); // Update with the correct path
// });

// // Handle the root route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(clientPath, 'view.html')); // Update with the correct HTML file name
// });

// // Start the Express server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

//-----------------------------------------------------------------------

const express = require('express');
const app = express();
const jsonServer = require('json-server');
const path = require('path');

// Serve JSON data using JSON Server middleware for the '/api' route
const jsonRouter = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use('/api', middlewares);
app.use('/api', jsonRouter);

// Serve JavaScript files with the appropriate MIME type
app.get('/UWADatagridView.js', (req, res) => {
  const clientPath = path.join(__dirname, 'client');
  res.sendFile(path.join(clientPath, 'UWADatagridView.js')); // Update with the correct path
});

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, 'client')));

// Handle the root route
app.get('/', (req, res) => {
  const clientPath = path.join(__dirname, 'client');
  res.sendFile(path.join(clientPath, 'view.html')); // Update with the correct HTML file name
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
