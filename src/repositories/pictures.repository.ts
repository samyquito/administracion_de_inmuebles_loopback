import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Pictures, PicturesRelations} from '../models';

export class PicturesRepository extends DefaultCrudRepository<
  Pictures,
  typeof Pictures.prototype.id,
  PicturesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Pictures, dataSource);
  }
}
