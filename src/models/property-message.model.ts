import {Model, model, property} from '@loopback/repository';

@model()
export class PropertyMessage extends Model {
  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'number',
    required: true,
  })
  idProperty: number;


  constructor(data?: Partial<PropertyMessage>) {
    super(data);
  }
}

export interface PropertyMessageRelations {
  // describe navigational properties here
}

export type PropertyMessageWithRelations = PropertyMessage & PropertyMessageRelations;
