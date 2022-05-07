import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PaymentsController} from '../controllers/payments.controller';
import {CreditNotesRepository, DebitNotesRepository, ExtraFessRepository, PaymentsRepository, PenaltiesRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class BillingServiceService {
  constructor(
    @repository(PenaltiesRepository)
    public penaltiesRepository: PenaltiesRepository,
    @repository(CreditNotesRepository)
    public creditNotesRepository: CreditNotesRepository,
    @repository(DebitNotesRepository)
    public debitNotesRepository: DebitNotesRepository,
    @repository(PaymentsController)
    public paymentsRepository: PaymentsRepository,
    @repository(ExtraFessRepository)
    public extraFeesRepository: ExtraFessRepository
  ) {}

  /*
   * Add service methods here
   */
}
