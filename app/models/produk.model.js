module.exports = (sequelize, Sequelize) => {
  const Produk = sequelize.define("produks", {
    produk: {
      type: Sequelize.STRING,
    },
    spesifikasi: {
      type: Sequelize.TEXT,
    },
    harga: {
      type: Sequelize.INTEGER,
    },
    stok: {
      type: Sequelize.INTEGER,
    },
    foto: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Produk;
};
