import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pictures,
  SocialArea,
} from '../models';
import {PicturesRepository} from '../repositories';

export class PicturesSocialAreaController {
  constructor(
    @repository(PicturesRepository)
    public picturesRepository: PicturesRepository,
  ) { }

  @get('/pictures/{id}/social-area', {
    responses: {
      '200': {
        description: 'SocialArea belonging to Pictures',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SocialArea)},
          },
        },
      },
    },
  })
  async getSocialArea(
    @param.path.number('id') id: typeof Pictures.prototype.id,
  ): Promise<SocialArea> {
    return this.picturesRepository.socialArea(id);
  }
}
