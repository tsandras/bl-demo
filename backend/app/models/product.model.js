const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

module.exports = (sequelize) => {
  const Product = sequelize.define(
    'Product',
    {
      title: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      state: {
        //TODO: add a dictionary for the states (bad, good, average)
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      toJSON: {
        transform: (doc, ret) => {
          ret.id = ret.id;
          delete ret._id;
          delete ret.__v;
          return ret;
        },
      },
    }
  );

  return Product;
};
