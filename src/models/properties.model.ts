import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {ApartmentTowers} from './apartment-towers.model';
import {UtilityRooms} from './utility-rooms.model';
import {ParkingLots} from './parking-lots.model';
import {People} from './people.model';
import {ExtraFess} from './extra-fess.model';

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
    mysql: {
      dataType: 'float',
      precision: 10,
      scale: 5
    }
  })
  area: number;

  @property({
    type: 'number',
    mysql: {
      dataType: 'float',
      precision: 10,
      scale: 5
    }
  })
  administrationCost: number;

  @property({
    type: 'number',
    mysql: {
      dataType: 'float',
      precision: 10,
      scale: 5
    }
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

  @hasMany(() => ExtraFess)
  extraFesses: ExtraFess[];

  @property({
    type: 'number',
  })
  extraFessId?: number;

  constructor(data?: Partial<Properties>) {
    super(data);
  }
}

export interface PropertiesRelations {
  // describe navigational properties here
}

export type PropertiesWithRelations = Properties & PropertiesRelations;
