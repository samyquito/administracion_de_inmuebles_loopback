import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Payments, PaymentsRelations} from '../models';

export class PaymentsRepository extends DefaultCrudRepository<
  Payments,
  typeof Payments.prototype.id,
  PaymentsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Payments, dataSource);
  }
}
