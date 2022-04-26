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
  People,
  Condominiums,
} from '../models';
import {PeopleRepository} from '../repositories';

export class PeopleCondominiumsController {
  constructor(
    @repository(PeopleRepository) protected peopleRepository: PeopleRepository,
  ) { }

  @get('/people/{id}/condominiums', {
    responses: {
      '200': {
        description: 'People has one Condominiums',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Condominiums),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Condominiums>,
  ): Promise<Condominiums> {
    return this.peopleRepository.admin(id).get(filter);
  }

  @post('/people/{id}/condominiums', {
    responses: {
      '200': {
        description: 'People model instance',
        content: {'application/json': {schema: getModelSchemaRef(Condominiums)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof People.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominiums, {
            title: 'NewCondominiumsInPeople',
            exclude: ['id'],
            optional: ['adminId']
          }),
        },
      },
    }) condominiums: Omit<Condominiums, 'id'>,
  ): Promise<Condominiums> {
    return this.peopleRepository.admin(id).create(condominiums);
  }

  @patch('/people/{id}/condominiums', {
    responses: {
      '200': {
        description: 'People.Condominiums PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Condominiums, {partial: true}),
        },
      },
    })
    condominiums: Partial<Condominiums>,
    @param.query.object('where', getWhereSchemaFor(Condominiums)) where?: Where<Condominiums>,
  ): Promise<Count> {
    return this.peopleRepository.admin(id).patch(condominiums, where);
  }

  @del('/people/{id}/condominiums', {
    responses: {
      '200': {
        description: 'People.Condominiums DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Condominiums)) where?: Where<Condominiums>,
  ): Promise<Count> {
    return this.peopleRepository.admin(id).delete(where);
  }
}
