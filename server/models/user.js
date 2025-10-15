const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM('buyer','seller','admin'), defaultValue: 'buyer' }
  }, { timestamps: true });
  User.beforeCreate(async (user) => {
    if (user.password) user.password = await bcrypt.hash(user.password, 10);
  });
  User.prototype.validatePassword = function(pwd){ return bcrypt.compare(pwd, this.password); }
  User.prototype.toJSON = function(){ const values = Object.assign({}, this.get()); delete values.password; return values; }
  return User;
};
