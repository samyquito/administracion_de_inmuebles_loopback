import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Payments, PaymentsRelations, Bills} from '../models';
import {BillsRepository} from './bills.repository';

export class PaymentsRepository extends DefaultCrudRepository<
  Payments,
  typeof Payments.prototype.id,
  PaymentsRelations
> {

  public readonly bills: BelongsToAccessor<Bills, typeof Payments.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BillsRepository') protected billsRepositoryGetter: Getter<BillsRepository>,
  ) {
    super(Payments, dataSource);
    this.bills = this.createBelongsToAccessorFor('bills', billsRepositoryGetter,);
    this.registerInclusionResolver('bills', this.bills.inclusionResolver);
  }
}
