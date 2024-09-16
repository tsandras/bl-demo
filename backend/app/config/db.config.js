const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: 'postgresql',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
  }
);

module.exports = sequelize;
