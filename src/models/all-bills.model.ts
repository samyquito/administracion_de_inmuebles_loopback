import {Model, model, property} from '@loopback/repository';

@model()
export class AllBills extends Model {
  @property({
    type: 'date',
    required: true,
  })
  paymentDeadLine: Date;

  @property({
    type: 'string',
  })
  message?: string;


  constructor(data?: Partial<AllBills>) {
    super(data);
  }
}

export interface AllBillsRelations {
  // describe navigational properties here
}

export type AllBillsWithRelations = AllBills & AllBillsRelations;
