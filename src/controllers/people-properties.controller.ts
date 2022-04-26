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
  People,
  Properties,
} from '../models';
import {PeopleRepository} from '../repositories';

export class PeoplePropertiesController {
  constructor(
    @repository(PeopleRepository) protected peopleRepository: PeopleRepository,
  ) { }

  @get('/people/{id}/properties', {
    responses: {
      '200': {
        description: 'People has one Properties',
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
    return this.peopleRepository.owner(id).get(filter);
  }

  @post('/people/{id}/properties', {
    responses: {
      '200': {
        description: 'People model instance',
        content: {'application/json': {schema: getModelSchemaRef(Properties)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof People.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Properties, {
            title: 'NewPropertiesInPeople',
            exclude: ['id'],
            optional: ['ownerId']
          }),
        },
      },
    }) properties: Omit<Properties, 'id'>,
  ): Promise<Properties> {
    return this.peopleRepository.owner(id).create(properties);
  }

  @patch('/people/{id}/properties', {
    responses: {
      '200': {
        description: 'People.Properties PATCH success count',
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
    return this.peopleRepository.owner(id).patch(properties, where);
  }

  @del('/people/{id}/properties', {
    responses: {
      '200': {
        description: 'People.Properties DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Properties)) where?: Where<Properties>,
  ): Promise<Count> {
    return this.peopleRepository.owner(id).delete(where);
  }
}
