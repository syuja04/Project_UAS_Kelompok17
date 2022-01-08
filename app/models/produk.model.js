const sql = require("./db.js");

// constructor
const Produk = function (produk) {
  this.produk = produk.produk;
  this.spesifikasi = produk.spesifikasi;
  this.harga = produk.harga;
  this.stok = produk.stok;
  this.published = produk.published;
};

Produk.create = (newProduk, result) => {
  sql.query("INSERT INTO produks SET ?", newProduk, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created produk: ", { id: res.insertId, ...newProduk });
    result(null, { id: res.insertId, ...newProduk });
  });
};

Produk.findById = (id, result) => {
  sql.query(`SELECT * FROM produks WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found produk: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Produk with the id
    result({ kind: "not_found" }, null);
  });
};

Produk.getAll = (produk, result) => {
  let query = "SELECT * FROM produks";

  if (produk) {
    query += ` WHERE produk LIKE '%${produk}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("produks: ", res);
    result(null, res);
  });
};

Produk.getAllPublished = (result) => {
  sql.query("SELECT * FROM produks WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("produks: ", res);
    result(null, res);
  });
};

Produk.updateById = (id, produk, result) => {
  sql.query("UPDATE produks SET produk = ?, spesifikasi = ?, harga = ?, stok = ?, published = ? WHERE id = ?", [produk.produk, produk.spesifikasi, produk.published, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Produk with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated produk: ", { id: id, ...produk });
    result(null, { id: id, ...produk });
  });
};

Produk.remove = (id, result) => {
  sql.query("DELETE FROM produks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Produk with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted produk with id: ", id);
    result(null, res);
  });
};

Produk.removeAll = (result) => {
  sql.query("DELETE FROM produks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} produks`);
    result(null, res);
  });
};

module.exports = Produk;
