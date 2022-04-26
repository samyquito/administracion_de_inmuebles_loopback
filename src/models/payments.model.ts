import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Bills} from './bills.model';

@model()
export class Payments extends Entity {
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
  paymentDate: string;

  @property({
    type: 'number',
    required: true,
  })
  paymentValue: number;

  @belongsTo(() => Bills)
  billsId: number;

  constructor(data?: Partial<Payments>) {
    super(data);
  }
}

export interface PaymentsRelations {
  // describe navigational properties here
}

export type PaymentsWithRelations = Payments & PaymentsRelations;
