import {Entity, model, property} from '@loopback/repository';

@model()
export class Condominiums extends Entity {
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
  condominiumName: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  bankAccount: string;

  @property({
    type: 'string',
    required: true,
  })
  bankName: string;

  @property({
    type: 'number',
    required: true,
  })
  interestOnArrears: number;

  @property({
    type: 'number',
    required: true,
  })
  area: number;

  @property({
    type: 'number',
    required: true,
  })
  initialBillNumber: number;

  @property({
    type: 'number',
    required: true,
  })
  currentBudget: number;

  @property({
    type: 'number',
  })
  adminId?: number;

  constructor(data?: Partial<Condominiums>) {
    super(data);
  }
}

export interface CondominiumsRelations {
  // describe navigational properties here
}

export type CondominiumsWithRelations = Condominiums & CondominiumsRelations;
