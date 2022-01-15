module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    name: {
      type: Sequelize.STRING,
    },
    license: {
      type: Sequelize.STRING,
    },
    street: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    province: {
      type: Sequelize.STRING,
    },
    regional: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Order;
};
