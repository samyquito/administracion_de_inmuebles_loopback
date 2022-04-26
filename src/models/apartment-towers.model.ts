import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Condominiums} from './condominiums.model';

@model()
export class ApartmentTowers extends Entity {
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

  @belongsTo(() => Condominiums)
  condominiumsId: number;

  constructor(data?: Partial<ApartmentTowers>) {
    super(data);
  }
}

export interface ApartmentTowersRelations {
  // describe navigational properties here
}

export type ApartmentTowersWithRelations = ApartmentTowers & ApartmentTowersRelations;
