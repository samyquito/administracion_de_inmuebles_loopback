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
import {Penalties} from '../models';
import {PenaltiesRepository} from '../repositories';

@authenticate('admin')
export class PenaltiesController {
  constructor(
    @repository(PenaltiesRepository)
    public penaltiesRepository : PenaltiesRepository,
  ) {}

  @post('/penalties')
  @response(200, {
    description: 'Penalties model instance',
    content: {'application/json': {schema: getModelSchemaRef(Penalties)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penalties, {
            title: 'NewPenalties',
            exclude: ['id'],
          }),
        },
      },
    })
    penalties: Omit<Penalties, 'id'>,
  ): Promise<Penalties> {
    return this.penaltiesRepository.create(penalties);
  }

  @get('/penalties/count')
  @response(200, {
    description: 'Penalties model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Penalties) where?: Where<Penalties>,
  ): Promise<Count> {
    return this.penaltiesRepository.count(where);
  }

  @get('/penalties')
  @response(200, {
    description: 'Array of Penalties model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Penalties, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Penalties) filter?: Filter<Penalties>,
  ): Promise<Penalties[]> {
    return this.penaltiesRepository.find(filter);
  }

  @patch('/penalties')
  @response(200, {
    description: 'Penalties PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penalties, {partial: true}),
        },
      },
    })
    penalties: Penalties,
    @param.where(Penalties) where?: Where<Penalties>,
  ): Promise<Count> {
    return this.penaltiesRepository.updateAll(penalties, where);
  }
  @authenticate('habitant')
  @get('/penalties/{id}')
  @response(200, {
    description: 'Penalties model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Penalties, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Penalties, {exclude: 'where'}) filter?: FilterExcludingWhere<Penalties>
  ): Promise<Penalties> {
    return this.penaltiesRepository.findById(id, filter);
  }

  @patch('/penalties/{id}')
  @response(204, {
    description: 'Penalties PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Penalties, {partial: true}),
        },
      },
    })
    penalties: Penalties,
  ): Promise<void> {
    await this.penaltiesRepository.updateById(id, penalties);
  }

  @put('/penalties/{id}')
  @response(204, {
    description: 'Penalties PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() penalties: Penalties,
  ): Promise<void> {
    await this.penaltiesRepository.replaceById(id, penalties);
  }

  @del('/penalties/{id}')
  @response(204, {
    description: 'Penalties DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.penaltiesRepository.deleteById(id);
  }
}
