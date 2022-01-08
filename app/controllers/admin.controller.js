const Admin = require("../models/admin.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Admin
  const admin = new Admin({
    username: req.body.username,
    password: req.body.password,
    published: req.body.published || false,
  });

  // Save Admin in the database
  Admin.create(admin, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin.",
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const username = req.query.username;

  Admin.getAll(username, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

exports.findAllPublished = (req, res) => {
  Admin.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Admin.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Admin with id " + req.params.id,
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

  Admin.updateById(req.params.id, new Admin(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Admin with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Admin.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Admin with id " + req.params.id,
        });
      }
    } else res.send({ message: `Admin was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Admin.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tutorials.",
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
