const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  console.log(mongoose.modelNames());
})

const { authenticateToken }= require('./authenticateToken.function')

const lenderData = require('./data');
app.use('/lenderData', authenticateToken, lenderData);

const loanType = require('./loanType');
app.use('/loanTypes', authenticateToken, loanType);

const login = require('./login');
app.use('/login', login);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});