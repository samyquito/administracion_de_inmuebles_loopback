import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UtilityRooms, UtilityRoomsRelations} from '../models';

export class UtilityRoomsRepository extends DefaultCrudRepository<
  UtilityRooms,
  typeof UtilityRooms.prototype.id,
  UtilityRoomsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(UtilityRooms, dataSource);
  }
}
