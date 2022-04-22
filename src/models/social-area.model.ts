import {Entity, model, property} from '@loopback/repository';

@model()
export class SocialArea extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  rentalCost: number;

  @property({
    type: 'number',
    required: true,
  })
  openingTime: number;

  @property({
    type: 'number',
    required: true,
  })
  closingTime: number;


  constructor(data?: Partial<SocialArea>) {
    super(data);
  }
}

export interface SocialAreaRelations {
  // describe navigational properties here
}

export type SocialAreaWithRelations = SocialArea & SocialAreaRelations;
