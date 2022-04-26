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
  ParkingLots,
} from '../models';
import {PropertiesRepository} from '../repositories';

export class PropertiesParkingLotsController {
  constructor(
    @repository(PropertiesRepository) protected propertiesRepository: PropertiesRepository,
  ) { }

  @get('/properties/{id}/parking-lots', {
    responses: {
      '200': {
        description: 'Properties has one ParkingLots',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParkingLots),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ParkingLots>,
  ): Promise<ParkingLots> {
    return this.propertiesRepository.parkingLots(id).get(filter);
  }

  @post('/properties/{id}/parking-lots', {
    responses: {
      '200': {
        description: 'Properties model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParkingLots)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Properties.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {
            title: 'NewParkingLotsInProperties',
            exclude: ['id'],
            optional: ['propertiesId']
          }),
        },
      },
    }) parkingLots: Omit<ParkingLots, 'id'>,
  ): Promise<ParkingLots> {
    return this.propertiesRepository.parkingLots(id).create(parkingLots);
  }

  @patch('/properties/{id}/parking-lots', {
    responses: {
      '200': {
        description: 'Properties.ParkingLots PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {partial: true}),
        },
      },
    })
    parkingLots: Partial<ParkingLots>,
    @param.query.object('where', getWhereSchemaFor(ParkingLots)) where?: Where<ParkingLots>,
  ): Promise<Count> {
    return this.propertiesRepository.parkingLots(id).patch(parkingLots, where);
  }

  @del('/properties/{id}/parking-lots', {
    responses: {
      '200': {
        description: 'Properties.ParkingLots DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ParkingLots)) where?: Where<ParkingLots>,
  ): Promise<Count> {
    return this.propertiesRepository.parkingLots(id).delete(where);
  }
}
