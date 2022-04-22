import {Entity, model, property} from '@loopback/repository';

@model()
export class Properties extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  area: number;

  @property({
    type: 'number',
    required: true,
  })
  administrationCost: number;

  @property({
    type: 'number',
    required: true,
  })
  coefficient: number;


  constructor(data?: Partial<Properties>) {
    super(data);
  }
}

export interface PropertiesRelations {
  // describe navigational properties here
}

export type PropertiesWithRelations = Properties & PropertiesRelations;
