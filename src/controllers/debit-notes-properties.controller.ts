import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DebitNotes,
  Properties,
} from '../models';
import {DebitNotesRepository} from '../repositories';

export class DebitNotesPropertiesController {
  constructor(
    @repository(DebitNotesRepository)
    public debitNotesRepository: DebitNotesRepository,
  ) { }

  @get('/debit-notes/{id}/properties', {
    responses: {
      '200': {
        description: 'Properties belonging to DebitNotes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Properties)},
          },
        },
      },
    },
  })
  async getProperties(
    @param.path.number('id') id: typeof DebitNotes.prototype.id,
  ): Promise<Properties> {
    return this.debitNotesRepository.properties(id);
  }
}
