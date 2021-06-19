import connection from "../helperFunctions/getConnection.js";

const Payment = connection.sequelize.define("Payment", {
  paymentMethod: {
    type: connection.DataTypes.ENUM,
    values: ["Card", "Cash", "UPI", "Cheque"],
    allowNull: false,
  },
  amountPaid: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  },
  transactionNumber: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  dateOfTransaction: {
    type: connection.DataTypes.DATEONLY,
    allowNull: true,
  }
});

const createTable = async function() {
    await Payment.sync();
};

export { Payment };

export default { createTable }