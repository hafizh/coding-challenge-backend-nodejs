'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

export class PoliceOfficer extends Model {
  public id!: number;
  public name!: string;
};

export default (sequelize: Sequelize) => {
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
  return PoliceOfficer;
};