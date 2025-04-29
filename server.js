const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./users');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/login', users.login);
app.post('/register', users.register);
app.get('/healthCheck',(res,res)=>{
  return res.status(200).json({message : "Health Check Ok"})
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
