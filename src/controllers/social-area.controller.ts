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
import {SocialArea} from '../models';
import {SocialAreaRepository} from '../repositories';

@authenticate('admin')
export class SocialAreaController {
  constructor(
    @repository(SocialAreaRepository)
    public socialAreaRepository : SocialAreaRepository,
  ) {}

  @post('/social-areas')
  @response(200, {
    description: 'SocialArea model instance',
    content: {'application/json': {schema: getModelSchemaRef(SocialArea)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SocialArea, {
            title: 'NewSocialArea',
            exclude: ['id'],
          }),
        },
      },
    })
    socialArea: Omit<SocialArea, 'id'>,
  ): Promise<SocialArea> {
    return this.socialAreaRepository.create(socialArea);
  }

  @get('/social-areas/count')
  @response(200, {
    description: 'SocialArea model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SocialArea) where?: Where<SocialArea>,
  ): Promise<Count> {
    return this.socialAreaRepository.count(where);
  }

  @get('/social-areas')
  @response(200, {
    description: 'Array of SocialArea model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SocialArea, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SocialArea) filter?: Filter<SocialArea>,
  ): Promise<SocialArea[]> {
    return this.socialAreaRepository.find(filter);
  }

  @patch('/social-areas')
  @response(200, {
    description: 'SocialArea PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SocialArea, {partial: true}),
        },
      },
    })
    socialArea: SocialArea,
    @param.where(SocialArea) where?: Where<SocialArea>,
  ): Promise<Count> {
    return this.socialAreaRepository.updateAll(socialArea, where);
  }

  @get('/social-areas/{id}')
  @response(200, {
    description: 'SocialArea model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SocialArea, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SocialArea, {exclude: 'where'}) filter?: FilterExcludingWhere<SocialArea>
  ): Promise<SocialArea> {
    return this.socialAreaRepository.findById(id, filter);
  }

  @patch('/social-areas/{id}')
  @response(204, {
    description: 'SocialArea PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SocialArea, {partial: true}),
        },
      },
    })
    socialArea: SocialArea,
  ): Promise<void> {
    await this.socialAreaRepository.updateById(id, socialArea);
  }

  @put('/social-areas/{id}')
  @response(204, {
    description: 'SocialArea PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() socialArea: SocialArea,
  ): Promise<void> {
    await this.socialAreaRepository.replaceById(id, socialArea);
  }

  @del('/social-areas/{id}')
  @response(204, {
    description: 'SocialArea DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.socialAreaRepository.deleteById(id);
  }
}
