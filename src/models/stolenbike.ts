'use strict';
import { Model, DataTypes, Sequelize, Optional, Association, HasOneGetAssociationMixin, HasOneSetAssociationMixin } from 'sequelize';
import { PoliceOfficer } from './policeofficer';

type StolenBikeStatus = "new" | "assigned" | "resolved" | "ignored"

interface StolenBikeAttributes {
  id: number;
  owner: string;
  serialNumber: number;
  label: string | null;
  status: StolenBikeStatus;
}

export interface StolenBikeCreationAttributes extends Optional<StolenBikeAttributes, 'id' | 'label'>{}

export class StolenBike extends Model<StolenBikeAttributes, StolenBikeCreationAttributes> {
  public id!: number;
  public owner!: string;
  public serialNumber!: number;
  public label!: string;
  public status!: StolenBikeStatus;

  public assignedTo!: HasOneGetAssociationMixin<PoliceOfficer>;
  public assignTo!: HasOneSetAssociationMixin<PoliceOfficer, number>;

  public static associations: {
    policeOfficer: Association<StolenBike, PoliceOfficer>;
  }
}

export default (sequelize: Sequelize) => {
  StolenBike.init({
    id: {
      type: DataTypes.NUMBER,
      autoIncrement: true,
      primaryKey: true
    },
    owner: DataTypes.STRING,
    label: DataTypes.STRING,
    serialNumber: DataTypes.NUMBER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StolenBike',
  });
  
  return StolenBike;
}