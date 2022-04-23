import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {PropertyType, PropertyTypeRelations} from '../models';

export class PropertyTypeRepository extends DefaultCrudRepository<
  PropertyType,
  typeof PropertyType.prototype.id,
  PropertyTypeRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PropertyType, dataSource);
  }
}
