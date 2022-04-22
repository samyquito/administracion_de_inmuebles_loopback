import {Entity, model, property} from '@loopback/repository';

@model()
export class CreditNotes extends Entity {
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
  reason: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;


  constructor(data?: Partial<CreditNotes>) {
    super(data);
  }
}

export interface CreditNotesRelations {
  // describe navigational properties here
}

export type CreditNotesWithRelations = CreditNotes & CreditNotesRelations;
