const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());


// requires
const connection = require("./db");
const profileRoute = require('./routes/profileRoute');

// database connection
(async () => await connection())();


async function run() {
  try {

      // api homepage
      app.get('/api', (req, res) => {
          res.send('Task server is ready.')
      })

      app.use('/api/profile', profileRoute);

      } finally {

  }
}

run().catch(console.dir);



// port listening
const startServer = (port) => {
    try {
      app.listen(port, () => {
        console.log(`Server running: http://localhost:${port}`);
      });
    } catch (error) {
      console.error(error);
      process.exit();
    }
  };
startServer(process.env.PORT || 5000);
