import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Penalties, PenaltiesRelations, Properties} from '../models';
import {PropertiesRepository} from './properties.repository';

export class PenaltiesRepository extends DefaultCrudRepository<
  Penalties,
  typeof Penalties.prototype.id,
  PenaltiesRelations
> {

  public readonly properties: BelongsToAccessor<Properties, typeof Penalties.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PropertiesRepository') protected propertiesRepositoryGetter: Getter<PropertiesRepository>,
  ) {
    super(Penalties, dataSource);
    this.properties = this.createBelongsToAccessorFor('properties', propertiesRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
  }
}
