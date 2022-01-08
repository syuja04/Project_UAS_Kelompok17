module.exports = (app) => {
  const payments = require("../controllers/payment.controller.js");

  var router = require("express").Router();

  // Create a new Payments
  router.post("/", payments.create);

  // Retrieve all Payments
  router.get("/", payments.findAll);

  // Retrieve all published Payments
  router.get("/published", payments.findAllPublished);

  // Retrieve a single Payments with id
  router.get("/:id", payments.findOne);

  // Update a Payments with id
  router.put("/:id", payments.update);

  // Delete a Payments with id
  router.delete("/:id", payments.delete);

  // Delete all Payments
  router.delete("/", payments.deleteAll);

  app.use("/api/payments", router);
};
