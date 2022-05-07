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
  ExtraFess,
} from '../models';
import {PropertiesRepository} from '../repositories';

export class PropertiesExtraFessController {
  constructor(
    @repository(PropertiesRepository) protected propertiesRepository: PropertiesRepository,
  ) { }

  @get('/properties/{id}/extra-fesses', {
    responses: {
      '200': {
        description: 'Array of Properties has many ExtraFess',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ExtraFess)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ExtraFess>,
  ): Promise<ExtraFess[]> {
    return this.propertiesRepository.extraFesses(id).find(filter);
  }

  @post('/properties/{id}/extra-fesses', {
    responses: {
      '200': {
        description: 'Properties model instance',
        content: {'application/json': {schema: getModelSchemaRef(ExtraFess)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Properties.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFess, {
            title: 'NewExtraFessInProperties',
            exclude: ['id'],
            optional: ['propertiesId']
          }),
        },
      },
    }) extraFess: Omit<ExtraFess, 'id'>,
  ): Promise<ExtraFess> {
    return this.propertiesRepository.extraFesses(id).create(extraFess);
  }

  @patch('/properties/{id}/extra-fesses', {
    responses: {
      '200': {
        description: 'Properties.ExtraFess PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFess, {partial: true}),
        },
      },
    })
    extraFess: Partial<ExtraFess>,
    @param.query.object('where', getWhereSchemaFor(ExtraFess)) where?: Where<ExtraFess>,
  ): Promise<Count> {
    return this.propertiesRepository.extraFesses(id).patch(extraFess, where);
  }

  @del('/properties/{id}/extra-fesses', {
    responses: {
      '200': {
        description: 'Properties.ExtraFess DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ExtraFess)) where?: Where<ExtraFess>,
  ): Promise<Count> {
    return this.propertiesRepository.extraFesses(id).delete(where);
  }
}
