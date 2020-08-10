'use strict';
import { Model, Optional, Association, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Sequelize, Op } from 'sequelize';
import { StolenBikeCase } from './stolenbikecase';

export interface PoliceOfficerAttributes {
  id: number;
  name: string;
}

interface PoliceOfficerCreationAttributes extends Optional<PoliceOfficerAttributes, 'id'> {}

export class PoliceOfficer extends Model<PoliceOfficerAttributes, PoliceOfficerCreationAttributes> 
implements PoliceOfficerAttributes {
  public id!: number;
  public name!: string;

  public getCase!: HasOneGetAssociationMixin<StolenBikeCase>;
  public assignCase!: HasOneSetAssociationMixin<StolenBikeCase, StolenBikeCase["id"]>;

  public readonly case?: StolenBikeCase;

  public static associations: {
    case: Association<PoliceOfficer, StolenBikeCase>;
  }

  public static async findFreeOfficer() {
    return this.findOne(
      {
        include: [this.associations.case],
        where: Sequelize.where(Sequelize.col(`caseId`), Op.is, null)
      });
  }
}