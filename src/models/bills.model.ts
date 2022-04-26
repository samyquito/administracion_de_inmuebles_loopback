import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Properties} from './properties.model';

@model()
export class Bills extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  paymentDeadline: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @belongsTo(() => Properties)
  propertiesId: number;

  constructor(data?: Partial<Bills>) {
    super(data);
  }
}

export interface BillsRelations {
  // describe navigational properties here
}

export type BillsWithRelations = Bills & BillsRelations;
