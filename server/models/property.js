module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull:false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT },
    location: { type: DataTypes.STRING },
    imageUrl: { type: DataTypes.STRING }
  }, { timestamps: true });
  return Property;
};
