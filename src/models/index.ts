'use strict';

import { Sequelize } from 'sequelize';
// import configAll from '../config/config.json';
import stolenBike from './stolenbike';
import policeOfficer from './policeofficer';

// const env = process.env.NODE_ENV || 'development';
// const config = configAll.env;

export const sequelize = new Sequelize({
    "dialect": "sqlite",
    "storage": "stolen_bikes.db.sqlite3"
  });
export const StolenBike = stolenBike(sequelize);
export const PoliceOfficer = policeOfficer(sequelize);

