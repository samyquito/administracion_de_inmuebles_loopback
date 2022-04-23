import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {ParkingLots, ParkingLotsRelations} from '../models';

export class ParkingLotsRepository extends DefaultCrudRepository<
  ParkingLots,
  typeof ParkingLots.prototype.id,
  ParkingLotsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ParkingLots, dataSource);
  }
}
