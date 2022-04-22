import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Penalties>) {
    super(data);
  }
}

export interface PenaltiesRelations {
  // describe navigational properties here
}

export type PenaltiesWithRelations = Penalties & PenaltiesRelations;
