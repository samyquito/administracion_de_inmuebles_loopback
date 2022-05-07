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
  ExtraFess,
  Properties,
} from '../models';
import {ExtraFessRepository} from '../repositories';

export class ExtraFessPropertiesController {
  constructor(
    @repository(ExtraFessRepository) protected extraFessRepository: ExtraFessRepository,
  ) { }

  @get('/extra-fesses/{id}/properties', {
    responses: {
      '200': {
        description: 'ExtraFess has one Properties',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Properties),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Properties>,
  ): Promise<Properties> {
    return this.extraFessRepository.properties(id).get(filter);
  }

  @post('/extra-fesses/{id}/properties', {
    responses: {
      '200': {
        description: 'ExtraFess model instance',
        content: {'application/json': {schema: getModelSchemaRef(Properties)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ExtraFess.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Properties, {
            title: 'NewPropertiesInExtraFess',
            exclude: ['id'],
            optional: ['extraFessId']
          }),
        },
      },
    }) properties: Omit<Properties, 'id'>,
  ): Promise<Properties> {
    return this.extraFessRepository.properties(id).create(properties);
  }

  @patch('/extra-fesses/{id}/properties', {
    responses: {
      '200': {
        description: 'ExtraFess.Properties PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Properties, {partial: true}),
        },
      },
    })
    properties: Partial<Properties>,
    @param.query.object('where', getWhereSchemaFor(Properties)) where?: Where<Properties>,
  ): Promise<Count> {
    return this.extraFessRepository.properties(id).patch(properties, where);
  }

  @del('/extra-fesses/{id}/properties', {
    responses: {
      '200': {
        description: 'ExtraFess.Properties DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Properties)) where?: Where<Properties>,
  ): Promise<Count> {
    return this.extraFessRepository.properties(id).delete(where);
  }
}
