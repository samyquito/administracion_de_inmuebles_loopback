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
import {Pictures} from '../models';
import {PicturesRepository} from '../repositories';

@authenticate('admin')
export class PicturesController {
  constructor(
    @repository(PicturesRepository)
    public picturesRepository : PicturesRepository,
  ) {}

  @post('/pictures')
  @response(200, {
    description: 'Pictures model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pictures)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pictures, {
            title: 'NewPictures',
            exclude: ['id'],
          }),
        },
      },
    })
    pictures: Omit<Pictures, 'id'>,
  ): Promise<Pictures> {
    return this.picturesRepository.create(pictures);
  }

  @authenticate('habitant')
  @get('/pictures/count')
  @response(200, {
    description: 'Pictures model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pictures) where?: Where<Pictures>,
  ): Promise<Count> {
    return this.picturesRepository.count(where);
  }

  @get('/pictures')
  @response(200, {
    description: 'Array of Pictures model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pictures, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pictures) filter?: Filter<Pictures>,
  ): Promise<Pictures[]> {
    return this.picturesRepository.find(filter);
  }

  @patch('/pictures')
  @response(200, {
    description: 'Pictures PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pictures, {partial: true}),
        },
      },
    })
    pictures: Pictures,
    @param.where(Pictures) where?: Where<Pictures>,
  ): Promise<Count> {
    return this.picturesRepository.updateAll(pictures, where);
  }

  @get('/pictures/{id}')
  @response(200, {
    description: 'Pictures model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pictures, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Pictures, {exclude: 'where'}) filter?: FilterExcludingWhere<Pictures>
  ): Promise<Pictures> {
    return this.picturesRepository.findById(id, filter);
  }

  @patch('/pictures/{id}')
  @response(204, {
    description: 'Pictures PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pictures, {partial: true}),
        },
      },
    })
    pictures: Pictures,
  ): Promise<void> {
    await this.picturesRepository.updateById(id, pictures);
  }

  @put('/pictures/{id}')
  @response(204, {
    description: 'Pictures PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pictures: Pictures,
  ): Promise<void> {
    await this.picturesRepository.replaceById(id, pictures);
  }

  @del('/pictures/{id}')
  @response(204, {
    description: 'Pictures DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.picturesRepository.deleteById(id);
  }
}
