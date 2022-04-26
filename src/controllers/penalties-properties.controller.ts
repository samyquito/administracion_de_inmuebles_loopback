import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Penalties,
  Properties,
} from '../models';
import {PenaltiesRepository} from '../repositories';

export class PenaltiesPropertiesController {
  constructor(
    @repository(PenaltiesRepository)
    public penaltiesRepository: PenaltiesRepository,
  ) { }

  @get('/penalties/{id}/properties', {
    responses: {
      '200': {
        description: 'Properties belonging to Penalties',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Properties)},
          },
        },
      },
    },
  })
  async getProperties(
    @param.path.number('id') id: typeof Penalties.prototype.id,
  ): Promise<Properties> {
    return this.penaltiesRepository.properties(id);
  }
}
