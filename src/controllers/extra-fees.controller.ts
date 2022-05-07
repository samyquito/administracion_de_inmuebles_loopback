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
import {ExtraFees} from '../models';
import {ExtraFeesRepository} from '../repositories';

export class ExtraFeesController {
  constructor(
    @repository(ExtraFeesRepository)
    public extraFeesRepository : ExtraFeesRepository,
  ) {}

  @post('/extra-fees')
  @response(200, {
    description: 'ExtraFees model instance',
    content: {'application/json': {schema: getModelSchemaRef(ExtraFees)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFees, {
            title: 'NewExtraFees',
            
          }),
        },
      },
    })
    extraFees: ExtraFees,
  ): Promise<ExtraFees> {
    return this.extraFeesRepository.create(extraFees);
  }

  @get('/extra-fees/count')
  @response(200, {
    description: 'ExtraFees model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ExtraFees) where?: Where<ExtraFees>,
  ): Promise<Count> {
    return this.extraFeesRepository.count(where);
  }

  @get('/extra-fees')
  @response(200, {
    description: 'Array of ExtraFees model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ExtraFees, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ExtraFees) filter?: Filter<ExtraFees>,
  ): Promise<ExtraFees[]> {
    return this.extraFeesRepository.find(filter);
  }

  @patch('/extra-fees')
  @response(200, {
    description: 'ExtraFees PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFees, {partial: true}),
        },
      },
    })
    extraFees: ExtraFees,
    @param.where(ExtraFees) where?: Where<ExtraFees>,
  ): Promise<Count> {
    return this.extraFeesRepository.updateAll(extraFees, where);
  }

  @get('/extra-fees/{id}')
  @response(200, {
    description: 'ExtraFees model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ExtraFees, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ExtraFees, {exclude: 'where'}) filter?: FilterExcludingWhere<ExtraFees>
  ): Promise<ExtraFees> {
    return this.extraFeesRepository.findById(id, filter);
  }

  @patch('/extra-fees/{id}')
  @response(204, {
    description: 'ExtraFees PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ExtraFees, {partial: true}),
        },
      },
    })
    extraFees: ExtraFees,
  ): Promise<void> {
    await this.extraFeesRepository.updateById(id, extraFees);
  }

  @put('/extra-fees/{id}')
  @response(204, {
    description: 'ExtraFees PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() extraFees: ExtraFees,
  ): Promise<void> {
    await this.extraFeesRepository.replaceById(id, extraFees);
  }

  @del('/extra-fees/{id}')
  @response(204, {
    description: 'ExtraFees DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.extraFeesRepository.deleteById(id);
  }
}
