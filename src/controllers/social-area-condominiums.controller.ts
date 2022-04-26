import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SocialArea,
  Condominiums,
} from '../models';
import {SocialAreaRepository} from '../repositories';

export class SocialAreaCondominiumsController {
  constructor(
    @repository(SocialAreaRepository)
    public socialAreaRepository: SocialAreaRepository,
  ) { }

  @get('/social-areas/{id}/condominiums', {
    responses: {
      '200': {
        description: 'Condominiums belonging to SocialArea',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Condominiums)},
          },
        },
      },
    },
  })
  async getCondominiums(
    @param.path.number('id') id: typeof SocialArea.prototype.id,
  ): Promise<Condominiums> {
    return this.socialAreaRepository.condominiums(id);
  }
}
