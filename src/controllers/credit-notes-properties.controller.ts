import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CreditNotes,
  Properties,
} from '../models';
import {CreditNotesRepository} from '../repositories';

export class CreditNotesPropertiesController {
  constructor(
    @repository(CreditNotesRepository)
    public creditNotesRepository: CreditNotesRepository,
  ) { }

  @get('/credit-notes/{id}/properties', {
    responses: {
      '200': {
        description: 'Properties belonging to CreditNotes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Properties)},
          },
        },
      },
    },
  })
  async getProperties(
    @param.path.number('id') id: typeof CreditNotes.prototype.id,
  ): Promise<Properties> {
    return this.creditNotesRepository.properties(id);
  }
}
