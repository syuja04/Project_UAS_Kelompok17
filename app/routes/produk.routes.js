module.exports = (app) => {
  // const multer = require("multer");
  const produks = require("../controllers/produk.controller.js");

  var router = require("express").Router();

  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "./assets/");
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, file.originalname);
  //   },
  // });

  // const upload = multer({ storage: storage });

  // Create a new Produk
  router.post("/add", produks.create);

  // Retrieve all Tutorials
  router.get("/", produks.findAll);

  // Retrieve all published Tutorials
  router.get("/published", produks.findAllPublished);

  // Retrieve a single Produk with id
  router.get("/:id", produks.findOne);

  // Update a Produk with id
  router.put("/:id", produks.update);

  // Delete a Produk with id
  router.delete("/:id", produks.delete);

  // Delete all Tutorials
  router.delete("/", produks.deleteAll);

  app.use("/api/produks", router);
};
