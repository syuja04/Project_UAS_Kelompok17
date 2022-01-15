module.exports = (app) => {
  const orders = require("../controllers/order.controller.js");

  var router = require("express").Router();

  // Create a new Order
  router.post("/add", orders.create);

  // Retrieve all Tutorials
  router.get("/", orders.findAll);

  // Retrieve all published Tutorials
  router.get("/published", orders.findAllPublished);

  // Retrieve a single Order with id
  router.get("/:id", orders.findOne);

  // Update a Order with id
  router.put("/:id", orders.update);

  // Delete a Order with id
  router.delete("/:id", orders.delete);

  // Delete all Tutorials
  router.delete("/", orders.deleteAll);

  app.use("/api/orders", router);
};
