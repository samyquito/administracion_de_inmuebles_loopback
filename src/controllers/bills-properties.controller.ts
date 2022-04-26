import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Bills,
  Properties,
} from '../models';
import {BillsRepository} from '../repositories';

export class BillsPropertiesController {
  constructor(
    @repository(BillsRepository)
    public billsRepository: BillsRepository,
  ) { }

  @get('/bills/{id}/properties', {
    responses: {
      '200': {
        description: 'Properties belonging to Bills',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Properties)},
          },
        },
      },
    },
  })
  async getProperties(
    @param.path.number('id') id: typeof Bills.prototype.id,
  ): Promise<Properties> {
    return this.billsRepository.properties(id);
  }
}
