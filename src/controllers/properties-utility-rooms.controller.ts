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
  UtilityRooms,
} from '../models';
import {PropertiesRepository} from '../repositories';

export class PropertiesUtilityRoomsController {
  constructor(
    @repository(PropertiesRepository) protected propertiesRepository: PropertiesRepository,
  ) { }

  @get('/properties/{id}/utility-rooms', {
    responses: {
      '200': {
        description: 'Properties has one UtilityRooms',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UtilityRooms),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UtilityRooms>,
  ): Promise<UtilityRooms> {
    return this.propertiesRepository.utilityRooms(id).get(filter);
  }

  @post('/properties/{id}/utility-rooms', {
    responses: {
      '200': {
        description: 'Properties model instance',
        content: {'application/json': {schema: getModelSchemaRef(UtilityRooms)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Properties.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UtilityRooms, {
            title: 'NewUtilityRoomsInProperties',
            exclude: ['id'],
            optional: ['propertiesId']
          }),
        },
      },
    }) utilityRooms: Omit<UtilityRooms, 'id'>,
  ): Promise<UtilityRooms> {
    return this.propertiesRepository.utilityRooms(id).create(utilityRooms);
  }

  @patch('/properties/{id}/utility-rooms', {
    responses: {
      '200': {
        description: 'Properties.UtilityRooms PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UtilityRooms, {partial: true}),
        },
      },
    })
    utilityRooms: Partial<UtilityRooms>,
    @param.query.object('where', getWhereSchemaFor(UtilityRooms)) where?: Where<UtilityRooms>,
  ): Promise<Count> {
    return this.propertiesRepository.utilityRooms(id).patch(utilityRooms, where);
  }

  @del('/properties/{id}/utility-rooms', {
    responses: {
      '200': {
        description: 'Properties.UtilityRooms DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UtilityRooms)) where?: Where<UtilityRooms>,
  ): Promise<Count> {
    return this.propertiesRepository.utilityRooms(id).delete(where);
  }
}
