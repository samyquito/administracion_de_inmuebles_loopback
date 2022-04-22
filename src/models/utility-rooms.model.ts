import {Entity, model, property} from '@loopback/repository';

@model()
export class UtilityRooms extends Entity {
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


  constructor(data?: Partial<UtilityRooms>) {
    super(data);
  }
}

export interface UtilityRoomsRelations {
  // describe navigational properties here
}

export type UtilityRoomsWithRelations = UtilityRooms & UtilityRoomsRelations;
