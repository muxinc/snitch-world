import { Model, Table, Column, DataType, Default } from 'sequelize-typescript';

import { LivestreamStateArray, LivestreamStateEnum, LivestreamStateKeys, StudioInstance } from '@/data/types';

@Table
export default class StudioInstanceModel extends Model<StudioInstance> {
  @Column(DataType.STRING(60))
  livestreamId!: string;
  
  @Column(DataType.STRING(60))
  studioId!: string;

  @Column(DataType.STRING(60))
  playbackId!: string;

  @Default(LivestreamStateEnum.idle)
  @Column({ type: DataType.ENUM(...LivestreamStateArray) })
  state!: LivestreamStateKeys;
}
