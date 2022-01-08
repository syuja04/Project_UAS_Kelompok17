const Produk = require("../models/produk.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Produk
  const produk = new Produk({
    produk: req.body.produk,
    spesifikasi: req.body.spesifikasi,
    harga: req.body.harga,
    stok: req.body.stok,
    published: req.body.published || false,
  });

  // Save Produk in the database
  Produk.create(produk, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Produk.",
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const produk = req.query.produk;

  Produk.getAll(produk, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving produks.",
      });
    else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Produk.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving produks.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Produk.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produk with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Produk with id " + req.params.id,
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

  Produk.updateById(req.params.id, new Produk(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produk with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Produk with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Produk.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produk with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Produk with id " + req.params.id,
        });
      }
    } else res.send({ message: `Produk was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Produk.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all produks.",
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
