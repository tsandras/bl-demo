const express = require('express');
const cors = require('cors');
const app = express();

const sequelize = require('./app/config/db.config');

var corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(
  express.urlencoded({ extended: true })
);

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});
// TODO: catch the error if the connection failed

require('./app/routes/product.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
