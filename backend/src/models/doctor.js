'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      doctor.belongsTo(models.User, { foreignKey: 'doctorId' })

      doctor.belongsTo(models.Allcodes, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' })
      doctor.belongsTo(models.Allcodes, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' })
      doctor.belongsTo(models.Allcodes, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' })
    }
  };

  doctor.init({
    clinicId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,

    priceId: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'doctor',
    freezeTableName: true
  });
  return doctor;
};