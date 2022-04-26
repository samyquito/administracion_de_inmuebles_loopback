import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {CreditNotes, CreditNotesRelations, Properties} from '../models';
import {PropertiesRepository} from './properties.repository';

export class CreditNotesRepository extends DefaultCrudRepository<
  CreditNotes,
  typeof CreditNotes.prototype.id,
  CreditNotesRelations
> {

  public readonly properties: BelongsToAccessor<Properties, typeof CreditNotes.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PropertiesRepository') protected propertiesRepositoryGetter: Getter<PropertiesRepository>,
  ) {
    super(CreditNotes, dataSource);
    this.properties = this.createBelongsToAccessorFor('properties', propertiesRepositoryGetter,);
    this.registerInclusionResolver('properties', this.properties.inclusionResolver);
  }
}
