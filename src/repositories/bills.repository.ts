import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Bills, BillsRelations, Properties} from '../models';
import {PropertiesRepository} from './properties.repository';

export class BillsRepository extends DefaultCrudRepository<
  Bills,
  typeof Bills.prototype.id,
  BillsRelations
> {

  public readonly properties: BelongsToAccessor<Properties, typeof Bills.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PropertiesRepository') protected propertiesRepositoryGetter: Getter<PropertiesRepository>,
  ) {
    super(Bills, dataSource);
    this.properties = this.createBelongsToAccessorFor('properties', propertiesRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
  }
}
