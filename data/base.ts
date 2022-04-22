import { DataBase } from './data-base';
import SequelizeBase from './sequelize';
import { StudioInstance } from './types';

let base:DataBase;

const getBase = ():DataBase => {
  if(!base) base = new SequelizeBase();

  return base;
};

export type { StudioInstance };

export {
  getBase
};
