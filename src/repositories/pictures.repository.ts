import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Pictures, PicturesRelations, SocialArea} from '../models';
import {SocialAreaRepository} from './social-area.repository';

export class PicturesRepository extends DefaultCrudRepository<
  Pictures,
  typeof Pictures.prototype.id,
  PicturesRelations
> {

  public readonly socialArea: BelongsToAccessor<SocialArea, typeof Pictures.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SocialAreaRepository') protected socialAreaRepositoryGetter: Getter<SocialAreaRepository>,
  ) {
    super(Pictures, dataSource);
    this.socialArea = this.createBelongsToAccessorFor('socialArea', socialAreaRepositoryGetter,);
    this.registerInclusionResolver('socialArea', this.socialArea.inclusionResolver);
  }
}
