const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME || "realestate_db",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "Kip200567.",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);
const User = require("./user")(sequelize, DataTypes);
const Property = require("./property")(sequelize, DataTypes);
User.hasMany(Property, { foreignKey: "userId", as: "properties" });
Property.belongsTo(User, { foreignKey: "userId", as: "owner" });
module.exports = { sequelize, User, Property };
