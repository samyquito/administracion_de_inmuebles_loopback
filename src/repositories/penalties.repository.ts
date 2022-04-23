import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Penalties, PenaltiesRelations} from '../models';

export class PenaltiesRepository extends DefaultCrudRepository<
  Penalties,
  typeof Penalties.prototype.id,
  PenaltiesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Penalties, dataSource);
  }
}
