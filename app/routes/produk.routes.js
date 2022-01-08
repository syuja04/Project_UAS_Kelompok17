module.exports = (app) => {
  const produks = require("../controllers/produk.controller.js");

  var router = require("express").Router();

  // Create a new Produks
  router.post("/", produks.create);

  // Retrieve all Tutorials
  router.get("/", produks.findAll);

  // Retrieve all published Tutorials
  router.get("/published", produks.findAllPublished);

  // Retrieve a single Produks with id
  router.get("/:id", produks.findOne);

  // Update a Produks with id
  router.put("/:id", produks.update);

  // Delete a Produks with id
  router.delete("/:id", produks.delete);

  // Delete all Tutorials
  router.delete("/", produks.deleteAll);

  app.use("/api/produks", router);
};
