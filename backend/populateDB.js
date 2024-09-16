const sequelize = require('./app/config/db.config');
const fs = require('fs');
const db = require('./app/models');
const csv = require('csv-parser');
const Product = db.products;

// NOTE: I used https://www.mockaroo.com/ to create seed.csv
const populateDB = async () => {
  try {
    await sequelize.sync({ force: true });

    const products = [];
    // const csvFilePath = path.join(__dirname, 'seed.csv');
    // TODO fix the path to the seed.csv file
    fs.createReadStream('seed.csv')
      .pipe(csv())
      .on('data', (row) => {
        products.push({
          title: row.title,
          description: row.description,
          state: row.state,
          price: parseFloat(row.price),
        });
      })
      .on('end', async () => {
        await Product.bulkCreate(products);
        console.log('Base de données peuplée avec succès.');
        await sequelize.close();
      });
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
    await sequelize.close();
  }
};

populateDB();
