const sql = require("./db.js");

// constructor
const Payment = function (payment) {
  this.produk = payment.produk;
  this.harga = payment.harga;
  this.total = payment.total;
  this.published = payment.published;
};

Payment.create = (newPayment, result) => {
  sql.query("INSERT INTO payments SET ?", newPayment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created payment: ", { id: res.insertId, ...newPayment });
    result(null, { id: res.insertId, ...newPayment });
  });
};

Payment.findById = (id, result) => {
  sql.query(`SELECT * FROM payments WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found payment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Payment with the id
    result({ kind: "not_found" }, null);
  });
};

Payment.getAll = (produk, result) => {
  let query = "SELECT * FROM payments";

  if (produk) {
    query += ` WHERE produk LIKE '%${produk}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("payments: ", res);
    result(null, res);
  });
};

Payment.getAllPublished = (result) => {
  sql.query("SELECT * FROM payments WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("payments: ", res);
    result(null, res);
  });
};

Payment.updateById = (id, payment, result) => {
  sql.query("UPDATE payments SET produk = ?, harga = ?, total = ?, published = ? WHERE id = ?", [payment.produk, payment.harga, payment.total, payment.published, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Payment with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated payment: ", { id: id, ...payment });
    result(null, { id: id, ...payment });
  });
};

Payment.remove = (id, result) => {
  sql.query("DELETE FROM payments WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Payment with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted payment with id: ", id);
    result(null, res);
  });
};

Payment.removeAll = (result) => {
  sql.query("DELETE FROM payments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} payments`);
    result(null, res);
  });
};

module.exports = Payment;
