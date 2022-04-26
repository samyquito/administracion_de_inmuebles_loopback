import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {SocialArea, SocialAreaRelations, Condominiums} from '../models';
import {CondominiumsRepository} from './condominiums.repository';

export class SocialAreaRepository extends DefaultCrudRepository<
  SocialArea,
  typeof SocialArea.prototype.id,
  SocialAreaRelations
> {

  public readonly condominiums: BelongsToAccessor<Condominiums, typeof SocialArea.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CondominiumsRepository') protected condominiumsRepositoryGetter: Getter<CondominiumsRepository>,
  ) {
    super(SocialArea, dataSource);
    this.condominiums = this.createBelongsToAccessorFor('condominiums', condominiumsRepositoryGetter,);
    this.registerInclusionResolver('condominiums', this.condominiums.inclusionResolver);
  }
}
