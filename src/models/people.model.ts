import {Entity, model, property, hasOne} from '@loopback/repository';
import {Condominiums} from './condominiums.model';
import {Properties} from './properties.model';

@model()
export class People extends Entity {
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
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  middleName: string;

  @property({
    type: 'string',
    required: true,
  })
  firstSurname: string;

  @property({
    type: 'string',
    required: true,
  })
  secondSurname: string;

  @property({
    type: 'string',
    required: true,
  })
  dni: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phoneNumber: string;

  @hasOne(() => Condominiums, {keyTo: 'adminId'})
  admin: Condominiums;

  @hasOne(() => Properties, {keyTo: 'ownerId'})
  owner: Properties;

  @hasOne(() => Properties, {keyTo: 'habitantId'})
  habitant: Properties;

  constructor(data?: Partial<People>) {
    super(data);
  }
}

export interface PeopleRelations {
  // describe navigational properties here
}

export type PeopleWithRelations = People & PeopleRelations;
