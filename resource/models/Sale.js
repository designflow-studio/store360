import connection from "../helperFunctions/getConnection";

const Sale = connection.sequelize.define("Sale", {
  id: {
    field: "saleid",
    type: connection.DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: connection.DataTypes.INTEGER,
    allowNull: false,
  },
  paymentMethod: {
    type: connection.DataTypes.ENUM,
    values: ["Card", "Cash", "UPI", "Split"],
    allowNull: false,
  },
  cashAmount: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  },
  cardAmount: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  },
  upiAmount: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  },
  stateTax: {
    type: connection.DataTypes.NUMBER,
    allowNull: true,
  },
  centralTax: {
    type: connection.DataTypes.NUMBER,
    allowNull: true,
  },
  productList: {
    type: connection.DataTypes.JSON,
    allowNull: false,
  },
});

const createTable = async function() {
  await Sale.sync();
};

const getSales = async function(columnToSort = "id") {
  const sales = await Sale.findAll({
    order: [[columnToSort, "ASC"]],
  });

  return sales;
};

const getSaleById = async function(id) {
    const sale = await Sale.findByPk(id);
    return sale.dataValues;
};

const createSale = async function(obj){
    const sale = await Sale.create({
        customerId : obj.customerId,
        paymentMethod : obj.paymentMethod,
        cashAmount: obj.cashAmount,
        cardAmount: obj.cardAmount,
        upiAmount: obj.upiAmount,
        stateTax: obj.stateTax,
        centralTax: obj.centralTax,
        productList: obj.productList,
    });
    return sale.dataValues;
}

export default {
  Sale,
  createTable,
  getSales,
  getSaleById,
  createSale
};
