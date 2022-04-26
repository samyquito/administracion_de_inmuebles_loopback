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
import {CreditNotes} from '../models';
import {CreditNotesRepository} from '../repositories';

export class CreditNotesController {
  constructor(
    @repository(CreditNotesRepository)
    public creditNotesRepository : CreditNotesRepository,
  ) {}

  @post('/credit-notes')
  @response(200, {
    description: 'CreditNotes model instance',
    content: {'application/json': {schema: getModelSchemaRef(CreditNotes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditNotes, {
            title: 'NewCreditNotes',
            exclude: ['id'],
          }),
        },
      },
    })
    creditNotes: Omit<CreditNotes, 'id'>,
  ): Promise<CreditNotes> {
    return this.creditNotesRepository.create(creditNotes);
  }

  @get('/credit-notes/count')
  @response(200, {
    description: 'CreditNotes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CreditNotes) where?: Where<CreditNotes>,
  ): Promise<Count> {
    return this.creditNotesRepository.count(where);
  }

  @get('/credit-notes')
  @response(200, {
    description: 'Array of CreditNotes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CreditNotes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CreditNotes) filter?: Filter<CreditNotes>,
  ): Promise<CreditNotes[]> {
    return this.creditNotesRepository.find(filter);
  }

  @patch('/credit-notes')
  @response(200, {
    description: 'CreditNotes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditNotes, {partial: true}),
        },
      },
    })
    creditNotes: CreditNotes,
    @param.where(CreditNotes) where?: Where<CreditNotes>,
  ): Promise<Count> {
    return this.creditNotesRepository.updateAll(creditNotes, where);
  }

  @get('/credit-notes/{id}')
  @response(200, {
    description: 'CreditNotes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CreditNotes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CreditNotes, {exclude: 'where'}) filter?: FilterExcludingWhere<CreditNotes>
  ): Promise<CreditNotes> {
    return this.creditNotesRepository.findById(id, filter);
  }

  @patch('/credit-notes/{id}')
  @response(204, {
    description: 'CreditNotes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreditNotes, {partial: true}),
        },
      },
    })
    creditNotes: CreditNotes,
  ): Promise<void> {
    await this.creditNotesRepository.updateById(id, creditNotes);
  }

  @put('/credit-notes/{id}')
  @response(204, {
    description: 'CreditNotes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() creditNotes: CreditNotes,
  ): Promise<void> {
    await this.creditNotesRepository.replaceById(id, creditNotes);
  }

  @del('/credit-notes/{id}')
  @response(204, {
    description: 'CreditNotes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.creditNotesRepository.deleteById(id);
  }
}
