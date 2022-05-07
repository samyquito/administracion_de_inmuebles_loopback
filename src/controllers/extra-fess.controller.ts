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
import {ExtraFess} from '../models';
import {ExtraFessRepository} from '../repositories';

export class ExtraFessController {
  constructor(
    @repository(ExtraFessRepository)
    public extraFessRepository : ExtraFessRepository,
  ) {}

  @post('/extra-fesses')
  @response(200, {
    description: 'ExtraFess model instance',
    content: {'application/json': {schema: getModelSchemaRef(ExtraFess)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFess, {
            title: 'NewExtraFess',
            exclude: ['id'],
          }),
        },
      },
    })
    extraFess: Omit<ExtraFess, 'id'>,
  ): Promise<ExtraFess> {
    return this.extraFessRepository.create(extraFess);
  }

  @get('/extra-fesses/count')
  @response(200, {
    description: 'ExtraFess model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ExtraFess) where?: Where<ExtraFess>,
  ): Promise<Count> {
    return this.extraFessRepository.count(where);
  }

  @get('/extra-fesses')
  @response(200, {
    description: 'Array of ExtraFess model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ExtraFess, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ExtraFess) filter?: Filter<ExtraFess>,
  ): Promise<ExtraFess[]> {
    return this.extraFessRepository.find(filter);
  }

  @patch('/extra-fesses')
  @response(200, {
    description: 'ExtraFess PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFess, {partial: true}),
        },
      },
    })
    extraFess: ExtraFess,
    @param.where(ExtraFess) where?: Where<ExtraFess>,
  ): Promise<Count> {
    return this.extraFessRepository.updateAll(extraFess, where);
  }

  @get('/extra-fesses/{id}')
  @response(200, {
    description: 'ExtraFess model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ExtraFess, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ExtraFess, {exclude: 'where'}) filter?: FilterExcludingWhere<ExtraFess>
  ): Promise<ExtraFess> {
    return this.extraFessRepository.findById(id, filter);
  }

  @patch('/extra-fesses/{id}')
  @response(204, {
    description: 'ExtraFess PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFess, {partial: true}),
        },
      },
    })
    extraFess: ExtraFess,
  ): Promise<void> {
    await this.extraFessRepository.updateById(id, extraFess);
  }

  @put('/extra-fesses/{id}')
  @response(204, {
    description: 'ExtraFess PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() extraFess: ExtraFess,
  ): Promise<void> {
    await this.extraFessRepository.replaceById(id, extraFess);
  }

  @del('/extra-fesses/{id}')
  @response(204, {
    description: 'ExtraFess DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.extraFessRepository.deleteById(id);
  }
}
