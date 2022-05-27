import {Model, model, property} from '@loopback/repository';

@model()
export class AllPropertyMessage extends Model {
  @property({
    type: 'string',
    required: true,
  })
  Message: string;


  constructor(data?: Partial<AllPropertyMessage>) {
    super(data);
  }
}

export interface AllPropertyMessageRelations {
  // describe navigational properties here
}

export type AllPropertyMessageWithRelations = AllPropertyMessage & AllPropertyMessageRelations;
