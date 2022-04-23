import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {CreditNotes, CreditNotesRelations} from '../models';

export class CreditNotesRepository extends DefaultCrudRepository<
  CreditNotes,
  typeof CreditNotes.prototype.id,
  CreditNotesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(CreditNotes, dataSource);
  }
}
