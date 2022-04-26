import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {People, PeopleRelations, Condominiums, Properties} from '../models';
import {CondominiumsRepository} from './condominiums.repository';
import {PropertiesRepository} from './properties.repository';

export class PeopleRepository extends DefaultCrudRepository<
  People,
  typeof People.prototype.id,
  PeopleRelations
> {

  public readonly admin: HasOneRepositoryFactory<Condominiums, typeof People.prototype.id>;

  public readonly owner: HasOneRepositoryFactory<Properties, typeof People.prototype.id>;

  public readonly habitant: HasOneRepositoryFactory<Properties, typeof People.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CondominiumsRepository') protected condominiumsRepositoryGetter: Getter<CondominiumsRepository>, @repository.getter('PropertiesRepository') protected propertiesRepositoryGetter: Getter<PropertiesRepository>,
  ) {
    super(People, dataSource);
    this.habitant = this.createHasOneRepositoryFactoryFor('habitant', propertiesRepositoryGetter);
    this.registerInclusionResolver('habitant', this.habitant.inclusionResolver);
    this.owner = this.createHasOneRepositoryFactoryFor('owner', propertiesRepositoryGetter);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.admin = this.createHasOneRepositoryFactoryFor('admin', condominiumsRepositoryGetter);
    this.registerInclusionResolver('admin', this.admin.inclusionResolver);
  }
}
