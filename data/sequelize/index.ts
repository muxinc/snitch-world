import { Sequelize } from 'sequelize-typescript';

import { DataBase } from '@/data/data-base';
import { StudioInstance } from '@/data/types';
import StudioInstanceModel from './studio-instance';

class SequelizeBase extends DataBase {
  private sequelize:Sequelize;

  constructor() {
    super();

    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [ StudioInstanceModel ],
    });
    
    this.sequelize.sync({ force: true });
  }

  select = async (studioInstance:StudioInstance) => {
    return await StudioInstanceModel.findOne({
      where: { ...studioInstance }
    });
  }

  update = async (studioInstance:StudioInstance) => {
    const { livestreamId } = studioInstance;
    const [count] = await StudioInstanceModel.update(
      studioInstance, { where: { livestreamId } }
    );

    return count;
  };

  insert = async (studioInstance:StudioInstance) => {
    await StudioInstanceModel.create(studioInstance);
  };

  delete = async (studioInstance:StudioInstance) => {
    (await this.select(studioInstance))?.destroy();
  }
}


export default SequelizeBase;
