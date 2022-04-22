import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Payments>) {
    super(data);
  }
}

export interface PaymentsRelations {
  // describe navigational properties here
}

export type PaymentsWithRelations = Payments & PaymentsRelations;
