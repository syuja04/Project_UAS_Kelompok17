const sql = require("./db.js");

// constructor
const Admin = function (admin) {
  this.username = admin.username;
  this.password = admin.password;
  this.published = admin.published;
};

Admin.create = (newAdmin, result) => {
  sql.query("INSERT INTO admins SET ?", newAdmin, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created admin: ", { id: res.insertId, ...newAdmin });
    result(null, { id: res.insertId, ...newAdmin });
  });
};

Admin.findById = (id, result) => {
  sql.query(`SELECT * FROM admins WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found admin: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Admin with the id
    result({ kind: "not_found" }, null);
  });
};

Admin.getAll = (username, result) => {
  let query = "SELECT * FROM admins";

  if (username) {
    query += ` WHERE username LIKE '%${username}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("admins: ", res);
    result(null, res);
  });
};

Admin.getAllPublished = (result) => {
  sql.query("SELECT * FROM admins WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("admins: ", res);
    result(null, res);
  });
};

Admin.updateById = (id, admin, result) => {
  sql.query("UPDATE admins SET username = ?, password = ?, published = ? WHERE id = ?", [admin.username, admin.password, admin.published, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Admin with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated admin: ", { id: id, ...admin });
    result(null, { id: id, ...admin });
  });
};

Admin.remove = (id, result) => {
  sql.query("DELETE FROM admins WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Admin with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted admin with id: ", id);
    result(null, res);
  });
};

Admin.removeAll = (result) => {
  sql.query("DELETE FROM admins", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} admins`);
    result(null, res);
  });
};

module.exports = Admin;
