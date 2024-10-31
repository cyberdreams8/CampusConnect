const functions = require('firebase-functions');
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
require('dotenv').config();

// Initialize Express
const app = express();

// MySQL Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from public directory

// Set up session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Basic Routes
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' });
});

app.get('/profile', (req, res) => {
  res.sendFile('profile.html', { root: 'public' });
});

// Example Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Implement your authentication logic here
  res.send('Login route'); // Replace with actual logic
});

// Export the app as a Cloud Function
exports.app = functions.https.onRequest(app);

