import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {DebitNotes, DebitNotesRelations, Properties} from '../models';
import {PropertiesRepository} from './properties.repository';

export class DebitNotesRepository extends DefaultCrudRepository<
  DebitNotes,
  typeof DebitNotes.prototype.id,
  DebitNotesRelations
> {

  public readonly properties: BelongsToAccessor<Properties, typeof DebitNotes.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PropertiesRepository') protected propertiesRepositoryGetter: Getter<PropertiesRepository>,
  ) {
    super(DebitNotes, dataSource);
    this.properties = this.createBelongsToAccessorFor('properties', propertiesRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
  }
}
