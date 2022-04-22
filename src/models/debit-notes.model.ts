import {Entity, model, property} from '@loopback/repository';

@model()
export class DebitNotes extends Entity {
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


  constructor(data?: Partial<DebitNotes>) {
    super(data);
  }
}

export interface DebitNotesRelations {
  // describe navigational properties here
}

export type DebitNotesWithRelations = DebitNotes & DebitNotesRelations;
