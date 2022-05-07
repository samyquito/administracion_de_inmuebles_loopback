import {Entity, model, property} from '@loopback/repository';

@model()
export class ExtraFees extends Entity {
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
  })
  value: number;

  @property({
    type: 'number',
  })
  propertiesId?: number;

  constructor(data?: Partial<ExtraFees>) {
    super(data);
  }
}

export interface ExtraFeesRelations {
  // describe navigational properties here
}

export type ExtraFeesWithRelations = ExtraFees & ExtraFeesRelations;
