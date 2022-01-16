module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payments", {
    location: {
      type: Sequelize.STRING,
    },
    date_in: {
      type: Sequelize.STRING,
    },
    date_out: {
      type: Sequelize.STRING,
    },
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
    note: {
      type: Sequelize.TEXT,
    },
    total: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Payment;
};
