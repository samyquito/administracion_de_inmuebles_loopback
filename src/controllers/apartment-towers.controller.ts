import {authenticate} from '@loopback/authentication';
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
import {ApartmentTowers} from '../models';
import {ApartmentTowersRepository} from '../repositories';

@authenticate('admin')
export class ApartmentTowersController {
  constructor(
    @repository(ApartmentTowersRepository)
    public apartmentTowersRepository : ApartmentTowersRepository,
  ) {}

  @post('/apartment-towers')
  @response(200, {
    description: 'ApartmentTowers model instance',
    content: {'application/json': {schema: getModelSchemaRef(ApartmentTowers)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApartmentTowers, {
            title: 'NewApartmentTowers',
            exclude: ['id'],
          }),
        },
      },
    })
    apartmentTowers: Omit<ApartmentTowers, 'id'>,
  ): Promise<ApartmentTowers> {
    return this.apartmentTowersRepository.create(apartmentTowers);
  }

  @get('/apartment-towers/count')
  @response(200, {
    description: 'ApartmentTowers model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ApartmentTowers) where?: Where<ApartmentTowers>,
  ): Promise<Count> {
    return this.apartmentTowersRepository.count(where);
  }

  @get('/apartment-towers')
  @response(200, {
    description: 'Array of ApartmentTowers model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ApartmentTowers, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ApartmentTowers) filter?: Filter<ApartmentTowers>,
  ): Promise<ApartmentTowers[]> {
    return this.apartmentTowersRepository.find(filter);
  }

  @patch('/apartment-towers')
  @response(200, {
    description: 'ApartmentTowers PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApartmentTowers, {partial: true}),
        },
      },
    })
    apartmentTowers: ApartmentTowers,
    @param.where(ApartmentTowers) where?: Where<ApartmentTowers>,
  ): Promise<Count> {
    return this.apartmentTowersRepository.updateAll(apartmentTowers, where);
  }

  @get('/apartment-towers/{id}')
  @response(200, {
    description: 'ApartmentTowers model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ApartmentTowers, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ApartmentTowers, {exclude: 'where'}) filter?: FilterExcludingWhere<ApartmentTowers>
  ): Promise<ApartmentTowers> {
    return this.apartmentTowersRepository.findById(id, filter);
  }

  @patch('/apartment-towers/{id}')
  @response(204, {
    description: 'ApartmentTowers PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ApartmentTowers, {partial: true}),
        },
      },
    })
    apartmentTowers: ApartmentTowers,
  ): Promise<void> {
    await this.apartmentTowersRepository.updateById(id, apartmentTowers);
  }

  @put('/apartment-towers/{id}')
  @response(204, {
    description: 'ApartmentTowers PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() apartmentTowers: ApartmentTowers,
  ): Promise<void> {
    await this.apartmentTowersRepository.replaceById(id, apartmentTowers);
  }

  @del('/apartment-towers/{id}')
  @response(204, {
    description: 'ApartmentTowers DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.apartmentTowersRepository.deleteById(id);
  }
}
