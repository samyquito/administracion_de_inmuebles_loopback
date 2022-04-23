import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ApartmentTowers, ApartmentTowersRelations} from '../models';

export class ApartmentTowersRepository extends DefaultCrudRepository<
  ApartmentTowers,
  typeof ApartmentTowers.prototype.id,
  ApartmentTowersRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ApartmentTowers, dataSource);
  }
}
