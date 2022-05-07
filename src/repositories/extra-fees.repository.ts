import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ExtraFees, ExtraFeesRelations} from '../models';

export class ExtraFeesRepository extends DefaultCrudRepository<
  ExtraFees,
  typeof ExtraFees.prototype.id,
  ExtraFeesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ExtraFees, dataSource);
  }
}
