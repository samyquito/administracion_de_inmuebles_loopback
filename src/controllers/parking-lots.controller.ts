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
import {ParkingLots} from '../models';
import {ParkingLotsRepository} from '../repositories';
import {PropertyCalcultionsService} from '../services';

@authenticate('admin')
export class ParkingLotsController {
  constructor(
    @repository(ParkingLotsRepository)
    public parkingLotsRepository : ParkingLotsRepository,
    @service(PropertyCalcultionsService)
    public propertyCalculation : PropertyCalcultionsService
  ) {}

  @post('/parking-lots')
  @response(200, {
    description: 'ParkingLots model instance',
    content: {'application/json': {schema: getModelSchemaRef(ParkingLots)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {
            title: 'NewParkingLots',
            exclude: ['id'],
          }),
        },
      },
    })
    parkingLots: Omit<ParkingLots, 'id'>,
  ): Promise<ParkingLots> {
   await this.propertyCalculation.updateArea(parkingLots.propertiesId, parkingLots.area)
    return this.parkingLotsRepository.create(parkingLots);
  }

  @get('/parking-lots/count')
  @response(200, {
    description: 'ParkingLots model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ParkingLots) where?: Where<ParkingLots>,
  ): Promise<Count> {
    return this.parkingLotsRepository.count(where);
  }
  @get('/parking-lots')
  @response(200, {
    description: 'Array of ParkingLots model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ParkingLots, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ParkingLots) filter?: Filter<ParkingLots>,
  ): Promise<ParkingLots[]> {
    return this.parkingLotsRepository.find(filter);
  }

  @patch('/parking-lots')
  @response(200, {
    description: 'ParkingLots PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {partial: true}),
        },
      },
    })
    parkingLots: ParkingLots,
    @param.where(ParkingLots) where?: Where<ParkingLots>,
  ): Promise<Count> {
    return this.parkingLotsRepository.updateAll(parkingLots, where);
  }

  @authenticate('habitant')
  @get('/parking-lots/{id}')
  @response(200, {
    description: 'ParkingLots model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ParkingLots, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ParkingLots, {exclude: 'where'}) filter?: FilterExcludingWhere<ParkingLots>
  ): Promise<ParkingLots> {
    return this.parkingLotsRepository.findById(id, filter);
  }

  @patch('/parking-lots/{id}')
  @response(204, {
    description: 'ParkingLots PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {partial: true}),
        },
      },
    })
    parkingLots: ParkingLots,
  ): Promise<void> {
    await this.parkingLotsRepository.updateById(id, parkingLots);
  }

  @put('/parking-lots/{id}')
  @response(204, {
    description: 'ParkingLots PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parkingLots: ParkingLots,
  ): Promise<void> {
    await this.parkingLotsRepository.replaceById(id, parkingLots);
  }

  @del('/parking-lots/{id}')
  @response(204, {
    description: 'ParkingLots DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parkingLotsRepository.deleteById(id);
  }
}
