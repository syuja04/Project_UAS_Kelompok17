const Payment = require("../models/payment.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Payment
  const payment = new Payment({
    produk: req.body.produk,
    harga: req.body.harga,
    total: req.body.total,
    published: req.body.published || false,
  });

  // Save Payment in the database
  Payment.create(payment, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Payment.",
      });
    else res.send(data);
  });
};

// Retrieve all payments from the database (with condition).
exports.findAll = (req, res) => {
  const produk = req.query.produk;

  Payment.getAll(produk, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving payments.",
      });
    else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Payment.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving payments.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Payment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Payment with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Payment with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Payment.updateById(req.params.id, new Payment(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Payment with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Payment with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Payment.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Payment with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Payment with id " + req.params.id,
        });
      }
    } else res.send({ message: `Payment was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Payment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all payments.",
      });
    else res.send({ message: `All payments were deleted successfully!` });
  });
};
