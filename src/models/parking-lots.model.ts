import {Entity, model, property} from '@loopback/repository';

@model()
export class ParkingLots extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  area: number;

  @property({
    type: 'number',
  })
  propertiesId?: number;

  constructor(data?: Partial<ParkingLots>) {
    super(data);
  }
}

export interface ParkingLotsRelations {
  // describe navigational properties here
}

export type ParkingLotsWithRelations = ParkingLots & ParkingLotsRelations;
