import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SocialArea, SocialAreaRelations} from '../models';

export class SocialAreaRepository extends DefaultCrudRepository<
  SocialArea,
  typeof SocialArea.prototype.id,
  SocialAreaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(SocialArea, dataSource);
  }
}
