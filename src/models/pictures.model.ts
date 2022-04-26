import {Entity, model, property, belongsTo} from '@loopback/repository';
import {SocialArea} from './social-area.model';

@model()
export class Pictures extends Entity {
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
  route: string;

  @property({
    type: 'any',
    required: true,
  })
  labels: any;

  @belongsTo(() => SocialArea)
  socialAreaId: number;

  constructor(data?: Partial<Pictures>) {
    super(data);
  }
}

export interface PicturesRelations {
  // describe navigational properties here
}

export type PicturesWithRelations = Pictures & PicturesRelations;
