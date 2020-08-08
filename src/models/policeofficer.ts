'use strict';
import { Model, DataTypes, Sequelize, Optional, Association, HasOneGetAssociationMixin } from 'sequelize';
import { StolenBike } from './stolenbike';

interface PoliceOfficerAttributes {
  id: number;
  name: string;
}

interface PoliceOfficerCreationAttributes extends Optional<PoliceOfficerAttributes, 'id'> {}

export class PoliceOfficer extends Model<PoliceOfficerAttributes, PoliceOfficerCreationAttributes> {
  public id!: number;
  public name!: string;

  public investigatingCase!: HasOneGetAssociationMixin<StolenBike>;
  public static associations: {
    stolenBikeCase: Association<PoliceOfficer, StolenBike>;
  }
}

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
}