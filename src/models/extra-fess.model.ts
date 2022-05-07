import {Entity, model, property, hasOne} from '@loopback/repository';
import {Properties} from './properties.model';

@model()
export class ExtraFess extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
    mysql: {
      dataType: 'float',
      precision: 10,
      scale: 5
    }
  })
  value: number;

  @property({
    type: 'number',
  })
  propertiesId?: number;

  @hasOne(() => Properties)
  properties: Properties;

  constructor(data?: Partial<ExtraFess>) {
    super(data);
  }
}

export interface ExtraFessRelations {
  // describe navigational properties here
}

export type ExtraFessWithRelations = ExtraFess & ExtraFessRelations;
