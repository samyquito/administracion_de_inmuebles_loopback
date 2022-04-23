import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Condominiums, CondominiumsRelations} from '../models';

export class CondominiumsRepository extends DefaultCrudRepository<
  Condominiums,
  typeof Condominiums.prototype.id,
  CondominiumsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Condominiums, dataSource);
  }
}
