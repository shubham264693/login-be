const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./users');
const morgan = require('morgan');


const app = express();
const PORT = 5000;

// Middleware
// app.use(cors());
app.use(cors({
  origin : '*'
}));
app.use(bodyParser.json());
app.use(morgan('combined'));

// app.use((req, res, next) => {
//   res.setHeader('Transfer-Encoding', '');
//   next();
// });
// app.use((_req, res, next) => {
//   res.header("Server", "");
//   next();
// }); 

// Routes
app.post('/login', users.login);
app.post('/register', users.register);
app.get('/healthCheck',(req,res)=>{
  return res.status(200).json({message : "Health Check Ok"})
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
