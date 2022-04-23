import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Bills, BillsRelations} from '../models';

export class BillsRepository extends DefaultCrudRepository<
  Bills,
  typeof Bills.prototype.id,
  BillsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Bills, dataSource);
  }
}
