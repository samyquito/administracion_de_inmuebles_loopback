import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ApartmentTowers,
  Condominiums,
} from '../models';
import {ApartmentTowersRepository} from '../repositories';

export class ApartmentTowersCondominiumsController {
  constructor(
    @repository(ApartmentTowersRepository)
    public apartmentTowersRepository: ApartmentTowersRepository,
  ) { }

  @get('/apartment-towers/{id}/condominiums', {
    responses: {
      '200': {
        description: 'Condominiums belonging to ApartmentTowers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Condominiums)},
          },
        },
      },
    },
  })
  async getCondominiums(
    @param.path.number('id') id: typeof ApartmentTowers.prototype.id,
  ): Promise<Condominiums> {
    return this.apartmentTowersRepository.condominiums(id);
  }
}
