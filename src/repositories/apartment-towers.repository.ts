import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {ApartmentTowers, ApartmentTowersRelations, Condominiums} from '../models';
import {CondominiumsRepository} from './condominiums.repository';

export class ApartmentTowersRepository extends DefaultCrudRepository<
  ApartmentTowers,
  typeof ApartmentTowers.prototype.id,
  ApartmentTowersRelations
> {

  public readonly condominiums: BelongsToAccessor<Condominiums, typeof ApartmentTowers.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CondominiumsRepository') protected condominiumsRepositoryGetter: Getter<CondominiumsRepository>,
  ) {
    super(ApartmentTowers, dataSource);
    this.condominiums = this.createBelongsToAccessorFor('condominiums', condominiumsRepositoryGetter,);
    this.registerInclusionResolver('condominiums', this.condominiums.inclusionResolver);
  }
}
