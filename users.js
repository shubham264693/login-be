const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // In production, use environment variables!

let userDB = []; // Temporary in-memory "database"

// Registration Controller
exports.register = async (req, res) => {
  const { firstName, lastName, username, email, password, mobile, gender } = req.body;

  // Check if the user already exists based on username
  const existingUser = userDB.find(user => user.username === username);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Save full user information in "userDB"
  const newUser = {
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    mobile,
    gender
  };

  userDB.push(newUser);

  res.json({ message: 'User registered successfully' });
};

// Login Controller
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = userDB.find(user => user.username === username);

  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ 
    message: 'Login successful',
    token,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      gender: user.gender
    }
  });
};
