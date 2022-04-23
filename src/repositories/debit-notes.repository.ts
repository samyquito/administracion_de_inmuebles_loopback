import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {DebitNotes, DebitNotesRelations} from '../models';

export class DebitNotesRepository extends DefaultCrudRepository<
  DebitNotes,
  typeof DebitNotes.prototype.id,
  DebitNotesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(DebitNotes, dataSource);
  }
}
