const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000; // You can change this to any available port
const SECRET_KEY = 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());

// Serve the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the JSON Auth Example API!');
});

// Fake "database" (JSON file)
const usersFile = './users.json';

// Helper function to read users from the "database"
function readUsers() {
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify([]));
    }
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
}

// Helper function to write users to the "database"
function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Register endpoint
app.post('/register', (req, res) => {
    const { email, password, age, gender, birthday, fitnessGoal, selfIntroduction } = req.body;
    const users = readUsers();

    // Check if the user already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Add the new user to the "database"
    const newUser = { email, password: hashedPassword, age, gender, birthday, fitnessGoal, selfIntroduction };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    // Find the user
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
});

// Profile endpoint (protected)
app.get('/profile', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }

        const users = readUsers();
        const user = users.find(user => user.email === decoded.email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            email: user.email,
            age: user.age,
            gender: user.gender,
            birthday: user.birthday,
            fitnessGoal: user.fitnessGoal,
            selfIntroduction: user.selfIntroduction
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});