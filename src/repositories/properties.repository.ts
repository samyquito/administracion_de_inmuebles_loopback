import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Properties, PropertiesRelations} from '../models';

export class PropertiesRepository extends DefaultCrudRepository<
  Properties,
  typeof Properties.prototype.id,
  PropertiesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Properties, dataSource);
  }
}
