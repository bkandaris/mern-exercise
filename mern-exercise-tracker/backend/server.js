const express = require('express'); // brings express
const cors = require('cors'); // brings in cors
const mongoose = require('mongoose'); // brings in mongoose
const router = express.Router();

require('dotenv').config(); // so we can have env variables

const app = express(); // creates our server
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use(cors()); // adds our cors middleware to parse json
app.use(express.json());

// // something we get from the mongoDB dashboard
const uri = process.env.ATLAS_URI;
// here is where our database is stored and how we start our connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established');
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// app knows where to listen and starts the port

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
