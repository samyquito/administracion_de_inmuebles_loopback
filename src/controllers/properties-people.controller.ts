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
  People,
} from '../models';
import {PropertiesRepository} from '../repositories';

export class PropertiesPeopleController {
  constructor(
    @repository(PropertiesRepository)
    public propertiesRepository: PropertiesRepository,
  ) { }

  @get('/properties/{id}/people', {
    responses: {
      '200': {
        description: 'People belonging to Properties',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(People)},
          },
        },
      },
    },
  })
  async getPeople(
    @param.path.number('id') id: typeof Properties.prototype.id,
  ): Promise<People> {
    return this.propertiesRepository.habitant(id);
  }
}
