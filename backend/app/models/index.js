const sequelize = require('../config/db.config.js');
const Sequelize = require('sequelize');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require('./product.model.js')(sequelize, Sequelize);

module.exports = db;
