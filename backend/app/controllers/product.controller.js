const { Op } = require('sequelize');

const db = require('../models');
const Product = db.products;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    state: req.body.state,
    price: req.body.price,
  });

  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Product.',
      });
    });
};

exports.findAll = async (req, res) => {
  const { page = 1, size = 10, title } = req.query;
  const limit = parseInt(size);
  const offset = (parseInt(page) - 1) * limit;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : {};

  try {
    // TODO: only one call to database !
    const totalItems = await Product.count({ where: condition });
    const data = await Product.findAll({ where: condition, limit, offset });

    const currentPage = parseInt(page);
    const totalPages = Math.ceil(totalItems / limit);

    res.send({
      totalItems,
      data,
      totalPages,
      currentPage,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving products.',
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({
        message: `Cannot find Product with id=${id}.`,
      });
    }

    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving Product with id=${id}`,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({
        message: `Cannot find Product with id=${id}.`,
      });
    }

    Object.assign(product, req.body);
    await product.save();

    res.send({
      message: 'Product was updated successfully.',
      product,
    });
  } catch (err) {
    res.status(500).send({
      message: `Error updating Product with id=${id}`,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({
        message: `Cannot find Product with id=${id}.`,
      });
    }

    await product.destroy();

    res.send({
      message: 'Product was deleted successfully.',
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not delete Product with id=${id}`,
    });
  }
};
