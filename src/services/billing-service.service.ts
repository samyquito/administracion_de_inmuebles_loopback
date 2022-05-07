import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PaymentsController} from '../controllers/payments.controller';
import {CreditNotesRepository, DebitNotesRepository, PaymentsRepository, PenaltiesRepository, PropertiesRepository} from '../repositories';

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
    @repository(PropertiesRepository)
    public propertysRepository: PropertiesRepository
  ) {}
 async crearFactura(id_property:number): Promise<number>{
    const administrationCost=(await this.propertysRepository.findById(id_property)).administrationCost;


 return administrationCost +450000
 }
}
