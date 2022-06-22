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
import {Condominiums} from '../models';
import {CondominiumsRepository} from '../repositories';

@authenticate('admin')
export class CondominiumsController {
  constructor(
    @repository(CondominiumsRepository)
    public condominiumsRepository : CondominiumsRepository,
  ) {}

  @post('/condominiums')
  @response(200, {
    description: 'Condominiums model instance',
    content: {'application/json': {schema: getModelSchemaRef(Condominiums)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominiums, {
            title: 'NewCondominiums',
            exclude: ['id'],
          }),
        },
      },
    })
    condominiums: Omit<Condominiums, 'id'>,
  ): Promise<Condominiums> {
    return this.condominiumsRepository.create(condominiums);
  }
  @get('/condominiums/count')
  @response(200, {
    description: 'Condominiums model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Condominiums) where?: Where<Condominiums>,
  ): Promise<Count> {
    return this.condominiumsRepository.count(where);
  }

  @authenticate.skip()
  @get('/condominiums')
  @response(200, {
    description: 'Array of Condominiums model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Condominiums, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Condominiums) filter?: Filter<Condominiums>,
  ): Promise<Condominiums[]> {
    return this.condominiumsRepository.find(filter);
  }

  @patch('/condominiums')
  @response(200, {
    description: 'Condominiums PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominiums, {partial: true}),
        },
      },
    })
    condominiums: Condominiums,
    @param.where(Condominiums) where?: Where<Condominiums>,
  ): Promise<Count> {
    return this.condominiumsRepository.updateAll(condominiums, where);
  }

  @get('/condominiums/{id}')
  @response(200, {
    description: 'Condominiums model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Condominiums, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Condominiums, {exclude: 'where'}) filter?: FilterExcludingWhere<Condominiums>
  ): Promise<Condominiums> {
    return this.condominiumsRepository.findById(id, filter);
  }

  @patch('/condominiums/{id}')
  @response(204, {
    description: 'Condominiums PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominiums, {partial: true}),
        },
      },
    })
    condominiums: Condominiums,
  ): Promise<void> {
    await this.condominiumsRepository.updateById(id, condominiums);
  }

  @put('/condominiums/{id}')
  @response(204, {
    description: 'Condominiums PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() condominiums: Condominiums,
  ): Promise<void> {
    await this.condominiumsRepository.replaceById(id, condominiums);
  }

  @del('/condominiums/{id}')
  @response(204, {
    description: 'Condominiums DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.condominiumsRepository.deleteById(id);
  }
}
