import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {PropertyType, PropertyTypeRelations, Properties} from '../models';
import {PropertiesRepository} from './properties.repository';

export class PropertyTypeRepository extends DefaultCrudRepository<
  PropertyType,
  typeof PropertyType.prototype.id,
  PropertyTypeRelations
> {

  public readonly properties: HasOneRepositoryFactory<Properties, typeof PropertyType.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PropertiesRepository') protected propertiesRepositoryGetter: Getter<PropertiesRepository>,
  ) {
    super(PropertyType, dataSource);
    this.properties = this.createHasOneRepositoryFactoryFor('properties', propertiesRepositoryGetter);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
  }
}
