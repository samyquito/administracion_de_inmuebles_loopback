import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Properties,
  ExtraFees,
} from '../models';
import {PropertiesRepository} from '../repositories';

export class PropertiesExtraFeesController {
  constructor(
    @repository(PropertiesRepository) protected propertiesRepository: PropertiesRepository,
  ) { }

  @get('/properties/{id}/extra-fees', {
    responses: {
      '200': {
        description: 'Array of Properties has many ExtraFees',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ExtraFees)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ExtraFees>,
  ): Promise<ExtraFees[]> {
    return this.propertiesRepository.extraFees(id).find(filter);
  }

  @post('/properties/{id}/extra-fees', {
    responses: {
      '200': {
        description: 'Properties model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExtraFees)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Properties.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFees, {
            title: 'NewExtraFeesInProperties',
            exclude: ['id'],
            optional: ['propertiesId']
          }),
        },
      },
    }) extraFees: Omit<ExtraFees, 'id'>,
  ): Promise<ExtraFees> {
    return this.propertiesRepository.extraFees(id).create(extraFees);
  }

  @patch('/properties/{id}/extra-fees', {
    responses: {
      '200': {
        description: 'Properties.ExtraFees PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFees, {partial: true}),
        },
      },
    })
    extraFees: Partial<ExtraFees>,
    @param.query.object('where', getWhereSchemaFor(ExtraFees)) where?: Where<ExtraFees>,
  ): Promise<Count> {
    return this.propertiesRepository.extraFees(id).patch(extraFees, where);
  }

  @del('/properties/{id}/extra-fees', {
    responses: {
      '200': {
        description: 'Properties.ExtraFees DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ExtraFees)) where?: Where<ExtraFees>,
  ): Promise<Count> {
    return this.propertiesRepository.extraFees(id).delete(where);
  }
}
