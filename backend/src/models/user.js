'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Allcodes, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
      User.belongsTo(models.Allcodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      User.hasOne(models.markdown, { foreignKey: 'doctorId' })
      User.hasOne(models.doctor, { foreignKey: 'doctorId' })
      User.hasMany(models.schedule, { foreignKey: 'doctorId', as: 'doctorData' })
      User.hasMany(models.booking, { foreignKey: 'patientId', as: 'patientData' })
    }
  };

  User.init({
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.STRING,
    gender: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.BLOB,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};