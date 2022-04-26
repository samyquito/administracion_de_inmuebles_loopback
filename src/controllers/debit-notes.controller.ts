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
import {DebitNotes} from '../models';
import {DebitNotesRepository} from '../repositories';

export class DebitNotesController {
  constructor(
    @repository(DebitNotesRepository)
    public debitNotesRepository : DebitNotesRepository,
  ) {}

  @post('/debit-notes')
  @response(200, {
    description: 'DebitNotes model instance',
    content: {'application/json': {schema: getModelSchemaRef(DebitNotes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebitNotes, {
            title: 'NewDebitNotes',
            exclude: ['id'],
          }),
        },
      },
    })
    debitNotes: Omit<DebitNotes, 'id'>,
  ): Promise<DebitNotes> {
    return this.debitNotesRepository.create(debitNotes);
  }

  @get('/debit-notes/count')
  @response(200, {
    description: 'DebitNotes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DebitNotes) where?: Where<DebitNotes>,
  ): Promise<Count> {
    return this.debitNotesRepository.count(where);
  }

  @get('/debit-notes')
  @response(200, {
    description: 'Array of DebitNotes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DebitNotes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DebitNotes) filter?: Filter<DebitNotes>,
  ): Promise<DebitNotes[]> {
    return this.debitNotesRepository.find(filter);
  }

  @patch('/debit-notes')
  @response(200, {
    description: 'DebitNotes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebitNotes, {partial: true}),
        },
      },
    })
    debitNotes: DebitNotes,
    @param.where(DebitNotes) where?: Where<DebitNotes>,
  ): Promise<Count> {
    return this.debitNotesRepository.updateAll(debitNotes, where);
  }

  @get('/debit-notes/{id}')
  @response(200, {
    description: 'DebitNotes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DebitNotes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DebitNotes, {exclude: 'where'}) filter?: FilterExcludingWhere<DebitNotes>
  ): Promise<DebitNotes> {
    return this.debitNotesRepository.findById(id, filter);
  }

  @patch('/debit-notes/{id}')
  @response(204, {
    description: 'DebitNotes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DebitNotes, {partial: true}),
        },
      },
    })
    debitNotes: DebitNotes,
  ): Promise<void> {
    await this.debitNotesRepository.updateById(id, debitNotes);
  }

  @put('/debit-notes/{id}')
  @response(204, {
    description: 'DebitNotes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() debitNotes: DebitNotes,
  ): Promise<void> {
    await this.debitNotesRepository.replaceById(id, debitNotes);
  }

  @del('/debit-notes/{id}')
  @response(204, {
    description: 'DebitNotes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.debitNotesRepository.deleteById(id);
  }
}
