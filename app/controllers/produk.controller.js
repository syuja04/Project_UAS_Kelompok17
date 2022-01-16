const { sequelize, Sequelize } = require("../models");
const db = require("../models");
const Produk = db.produks;
const Op = db.Sequelize.Op;

// Create and Save a new Produk
exports.create = (req, res) => {
  // Validate request
  if (!req.body.produk) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Produk
  const produk = {
    produk: req.body.produk,
    spesifikasi: req.body.spesifikasi,
    harga: req.body.harga,
    stok: req.body.stok,
    foto: req.body.foto,
    published: req.body.published ? req.body.published : false,
  };

  //Save Produk in the database
  Produk.create(produk)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Produk.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const produk = req.query.produk;
  var condition = produk ? { produk: { [Op.like]: `%${produk}%` } } : null;

  Produk.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving produks.",
      });
    });
};

// Find a single Produk with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Produk.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Produk with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Produk with id=" + id,
      });
    });
};

// Update a Produk by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Produk.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Produk was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Produk with id=${id}. Maybe Produk was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Produk with id=" + id,
      });
    });
};

// Delete a Produk with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Produk.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Produk was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Produk with id=${id}. Maybe Produk was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Produk with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Produk.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all produks.",
      });
    });
};

// find all published Produk
exports.findAllPublished = (req, res) => {
  Produk.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving produks.",
      });
    });
};

// exports.jumlahProduk = (req, res) => {
//   Produk.findAll({
//     attibutes: {
//       include: [[Sequelize.fn("COUNT", Sequelize.col("id")), "produkCount"]],
//     },
//     include: [
//       {
//         model: Produk,
//         attibutes: [],
//       },
//     ],
//   });
// };
