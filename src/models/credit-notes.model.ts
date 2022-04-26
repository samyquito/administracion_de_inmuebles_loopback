import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Properties} from './properties.model';

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

  @belongsTo(() => Properties)
  propertiesId: number;

  constructor(data?: Partial<CreditNotes>) {
    super(data);
  }
}

export interface CreditNotesRelations {
  // describe navigational properties here
}

export type CreditNotesWithRelations = CreditNotes & CreditNotesRelations;
