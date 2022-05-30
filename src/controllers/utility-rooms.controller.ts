import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UtilityRooms} from '../models';
import {UtilityRoomsRepository} from '../repositories';
import {PropertyCalcultionsService} from '../services';

@authenticate('admin')
export class UtilityRoomsController {
  constructor(
    @repository(UtilityRoomsRepository)
    public utilityRoomsRepository : UtilityRoomsRepository,
    @service(PropertyCalcultionsService)
    public propertyCalculationService: PropertyCalcultionsService
  ) {}

  @post('/utility-rooms')
  @response(200, {
    description: 'UtilityRooms model instance',
    content: {'application/json': {schema: getModelSchemaRef(UtilityRooms)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UtilityRooms, {
            title: 'NewUtilityRooms',
            exclude: ['id'],
          }),
        },
      },
    })
    utilityRooms: Omit<UtilityRooms, 'id'>,
  ): Promise<UtilityRooms> {
    await this.propertyCalculationService.updateArea(utilityRooms.propertiesId, utilityRooms.area)
    return this.utilityRoomsRepository.create(utilityRooms);
  }

  @get('/utility-rooms/count')
  @response(200, {
    description: 'UtilityRooms model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UtilityRooms) where?: Where<UtilityRooms>,
  ): Promise<Count> {
    return this.utilityRoomsRepository.count(where);
  }


  @get('/utility-rooms')
  @response(200, {
    description: 'Array of UtilityRooms model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UtilityRooms, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UtilityRooms) filter?: Filter<UtilityRooms>,
  ): Promise<UtilityRooms[]> {
    return this.utilityRoomsRepository.find(filter);
  }

  @patch('/utility-rooms')
  @response(200, {
    description: 'UtilityRooms PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UtilityRooms, {partial: true}),
        },
      },
    })
    utilityRooms: UtilityRooms,
    @param.where(UtilityRooms) where?: Where<UtilityRooms>,
  ): Promise<Count> {
    return this.utilityRoomsRepository.updateAll(utilityRooms, where);
  }
  @authenticate('habitant')
  @get('/utility-rooms/{id}')
  @response(200, {
    description: 'UtilityRooms model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UtilityRooms, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(UtilityRooms, {exclude: 'where'}) filter?: FilterExcludingWhere<UtilityRooms>
  ): Promise<UtilityRooms> {
    return this.utilityRoomsRepository.findById(id, filter);
  }

  @patch('/utility-rooms/{id}')
  @response(204, {
    description: 'UtilityRooms PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UtilityRooms, {partial: true}),
        },
      },
    })
    utilityRooms: UtilityRooms,
  ): Promise<void> {
    await this.utilityRoomsRepository.updateById(id, utilityRooms);
  }

  @put('/utility-rooms/{id}')
  @response(204, {
    description: 'UtilityRooms PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() utilityRooms: UtilityRooms,
  ): Promise<void> {
    await this.utilityRoomsRepository.replaceById(id, utilityRooms);
  }

  @del('/utility-rooms/{id}')
  @response(204, {
    description: 'UtilityRooms DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.utilityRoomsRepository.deleteById(id);
  }
}
