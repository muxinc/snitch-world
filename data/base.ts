import { DataBase } from './data-base';
import SequelizeBase from './sequelize';
import { StudioInstance } from './types';

let base:DataBase;

const getBase = async (): Promise<DataBase> => {
  if(!base) {
    base = new SequelizeBase();
    await base.init();
  }

  return base;
};

export type { StudioInstance };

export {
  getBase
};
