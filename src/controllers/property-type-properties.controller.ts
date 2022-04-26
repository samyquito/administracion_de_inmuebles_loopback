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
  PropertyType,
  Properties,
} from '../models';
import {PropertyTypeRepository} from '../repositories';

export class PropertyTypePropertiesController {
  constructor(
    @repository(PropertyTypeRepository) protected propertyTypeRepository: PropertyTypeRepository,
  ) { }

  @get('/property-types/{id}/properties', {
    responses: {
      '200': {
        description: 'PropertyType has one Properties',
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
    return this.propertyTypeRepository.properties(id).get(filter);
  }

  @post('/property-types/{id}/properties', {
    responses: {
      '200': {
        description: 'PropertyType model instance',
        content: {'application/json': {schema: getModelSchemaRef(Properties)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof PropertyType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Properties, {
            title: 'NewPropertiesInPropertyType',
            exclude: ['id'],
            optional: ['propertyTypeId']
          }),
        },
      },
    }) properties: Omit<Properties, 'id'>,
  ): Promise<Properties> {
    return this.propertyTypeRepository.properties(id).create(properties);
  }

  @patch('/property-types/{id}/properties', {
    responses: {
      '200': {
        description: 'PropertyType.Properties PATCH success count',
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
    return this.propertyTypeRepository.properties(id).patch(properties, where);
  }

  @del('/property-types/{id}/properties', {
    responses: {
      '200': {
        description: 'PropertyType.Properties DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Properties)) where?: Where<Properties>,
  ): Promise<Count> {
    return this.propertyTypeRepository.properties(id).delete(where);
  }
}
