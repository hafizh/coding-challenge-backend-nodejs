'use strict';
import { Model, Optional, Association, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, Sequelize, Op } from 'sequelize';
import { PoliceOfficer } from './policeofficer';

type StolenBikeStatus = "new" | "assigned" | "resolved" | "ignored"

export interface StolenBikeCaseAttributes {
  id: number;
  owner: string;
  serialNumber: number;
  label: string | null;
  status: StolenBikeStatus;
}

export interface StolenBikeCreationAttributes extends Optional<StolenBikeCaseAttributes, 'id'>{}

export class StolenBikeCase extends Model<StolenBikeCaseAttributes, StolenBikeCreationAttributes> 
implements StolenBikeCaseAttributes {
  public id!: number;
  public owner!: string;
  public serialNumber!: number;
  public label!: string;
  public status!: StolenBikeStatus;

  public assignedTo!: BelongsToGetAssociationMixin<PoliceOfficer>;
  public assignTo!: BelongsToSetAssociationMixin<PoliceOfficer, PoliceOfficer["id"]>;

  public readonly policeOfficer?: PoliceOfficer;

  public static associations: {
    policeOfficer: Association<StolenBikeCase, PoliceOfficer>;
  }

  public static async finsUnassignedCase() {
    return this.findOne({
      include: [this.associations.policeOfficer],
      where: Sequelize.where(Sequelize.col(`PoliceOfficerId`), Op.is, null)
    });
  }
}