const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'users.json');

app.use(bodyParser.json());
app.use(express.static('public')); // Serves HTML, CSS, JS files from `public` directory

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
  });
  

// Helper function to load and save users
function loadUsers() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function saveUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists." });
  }

  users.push({ username, password });
  saveUsers(users);

  res.status(201).json({ message: "Registration successful!" });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  res.status(200).json({ message: "Login successful!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
