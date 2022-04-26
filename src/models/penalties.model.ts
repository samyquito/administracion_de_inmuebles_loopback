import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Properties} from './properties.model';

@model()
export class Penalties extends Entity {
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
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @belongsTo(() => Properties)
  propertiesId: number;

  constructor(data?: Partial<Penalties>) {
    super(data);
  }
}

export interface PenaltiesRelations {
  // describe navigational properties here
}

export type PenaltiesWithRelations = Penalties & PenaltiesRelations;
