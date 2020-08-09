'use strict';

import { Sequelize } from 'sequelize';
import stolenBike from './stolenbike';
import policeOfficer from './policeofficer';

const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize({
    "dialect": "sqlite",
    "storage": (env !== 'test') ? "stolen_bikes.db.sqlite3" : ":memory"
  });
export const StolenBike = stolenBike(sequelize);
export const PoliceOfficer = policeOfficer(sequelize);

