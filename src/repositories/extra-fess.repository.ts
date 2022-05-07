import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ExtraFess, ExtraFessRelations, Properties} from '../models';
import {PropertiesRepository} from './properties.repository';

export class ExtraFessRepository extends DefaultCrudRepository<
  ExtraFess,
  typeof ExtraFess.prototype.id,
  ExtraFessRelations
> {

  public readonly properties: HasOneRepositoryFactory<Properties, typeof ExtraFess.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PropertiesRepository') protected propertiesRepositoryGetter: Getter<PropertiesRepository>,
  ) {
    super(ExtraFess, dataSource);
    this.properties = this.createHasOneRepositoryFactoryFor('properties', propertiesRepositoryGetter);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
  }
}
