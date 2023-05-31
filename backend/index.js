const express = require('express');
const session = require('express-session');
const cors = require('cors');
const router = express.Router();

const app = express()
app.use(cors())

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});