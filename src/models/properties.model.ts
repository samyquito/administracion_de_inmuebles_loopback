import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {ApartmentTowers} from './apartment-towers.model';
import {UtilityRooms} from './utility-rooms.model';
import {ParkingLots} from './parking-lots.model';
import {People} from './people.model';

@model()
export class Properties extends Entity {
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
  administrationCost: number;

  @property({
    type: 'number',
  })
  coefficient: number;

  @belongsTo(() => ApartmentTowers)
  apartmentTowersId: number;

  @property({
    type: 'number',
  })
  propertyTypeId?: number;

  @hasOne(() => UtilityRooms)
  utilityRooms: UtilityRooms;

  @hasOne(() => ParkingLots)
  parkingLots: ParkingLots;

  @property({
    type: 'number',
  })
  ownerId?: number;

  @belongsTo(() => People)
  habitantId: number;

  constructor(data?: Partial<Properties>) {
    super(data);
  }
}

export interface PropertiesRelations {
  // describe navigational properties here
}

export type PropertiesWithRelations = Properties & PropertiesRelations;
