import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Properties,
  ApartmentTowers,
} from '../models';
import {PropertiesRepository} from '../repositories';

export class PropertiesApartmentTowersController {
  constructor(
    @repository(PropertiesRepository)
    public propertiesRepository: PropertiesRepository,
  ) { }

  @get('/properties/{id}/apartment-towers', {
    responses: {
      '200': {
        description: 'ApartmentTowers belonging to Properties',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ApartmentTowers)},
          },
        },
      },
    },
  })
  async getApartmentTowers(
    @param.path.number('id') id: typeof Properties.prototype.id,
  ): Promise<ApartmentTowers> {
    return this.propertiesRepository.apartmentTowers(id);
  }
}
