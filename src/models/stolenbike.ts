'use strict';
import { Model, DataTypes, Sequelize, Optional, Association, HasOneGetAssociationMixin } from 'sequelize';
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

class StolenBike extends Model<StolenBikeAttributes, StolenBikeCreationAttributes> {
  public id!: number;
  public owner!: string;
  public serialNumber!: number;
  public label!: string;
  public status: StolenBikeStatus = 'new';

  public assignedTo!: HasOneGetAssociationMixin<PoliceOfficer>;
  
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
};