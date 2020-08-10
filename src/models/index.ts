'use strict';

import { Sequelize, DataTypes } from 'sequelize';
import { StolenBikeCase } from './stolenbikecase';
import { PoliceOfficer } from './policeofficer';

const env = process.env.NODE_ENV || 'development';

export default () => {
  const sequelize = new Sequelize({
    "dialect": "sqlite",
    "storage": (env !== 'test') ? "stolen_bikes.db.sqlite3" : ":memory"
  });
  
  StolenBikeCase.init({
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    owner: DataTypes.STRING,
    label: DataTypes.STRING,
    serialNumber: DataTypes.NUMBER,
    status: {
      type: DataTypes.ENUM("new", "assigned", "resolved", "ignored"),
      defaultValue: "new"
    }
  }, {
    sequelize,
    modelName: 'StolenBikeCase',
  });
  
  PoliceOfficer.init({
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PoliceOfficer',
  });

  StolenBikeCase.belongsTo(PoliceOfficer, {targetKey: "id"})
  PoliceOfficer.hasOne(StolenBikeCase, {sourceKey: "id"});
}
