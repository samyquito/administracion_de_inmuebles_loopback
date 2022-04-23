import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {People, PeopleRelations} from '../models';

export class PeopleRepository extends DefaultCrudRepository<
  People,
  typeof People.prototype.id,
  PeopleRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(People, dataSource);
  }
}
