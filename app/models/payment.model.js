module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payments", {
    status: {
      type: Sequelize.STRING,
    },
    total: {
      type: Sequelize.INTEGER,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Payment;
};
