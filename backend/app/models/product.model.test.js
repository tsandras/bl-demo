const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const Product = require('./product.model')(sequelize, DataTypes);

describe('Product Model', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product with valid attributes', async () => {
    const product = await Product.create({
      title: 'Test Product',
      description: 'This is a test product',
      state: 'new',
      price: 99.99,
    });

    expect(product.title).toBe('Test Product');
    expect(product.description).toBe('This is a test product');
    expect(product.state).toBe('new');
    expect(product.price).toBe(99.99);
  });

  it('should not create a product with invalid attributes', async () => {
    try {
      await Product.create({
        title: 'Test Product',
        description: null, // Invalid attribute
        state: 'new',
        price: 99.99,
      });
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });
});
