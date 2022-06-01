import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {CountSchema, repository} from '@loopback/repository';
import {resourceUsage} from 'process';
import {BillsRepository, CreditNotesRepository, DebitNotesRepository, ExtraFeesRepository, PenaltiesRepository, PeopleRepository, PropertiesRepository} from '../repositories';
import {NotificationService} from './notification.service';

@injectable({scope: BindingScope.TRANSIENT})
export class InvoicesValuesService {
  constructor(
    @repository(PenaltiesRepository)
    public penaltiesRepository: PenaltiesRepository,
    @repository(CreditNotesRepository)
    public creditNotesRepository: CreditNotesRepository,
    @repository(DebitNotesRepository)
    public debitNotesRepository: DebitNotesRepository,
    @repository(PropertiesRepository)
    public propertysRepository: PropertiesRepository,
    @repository(ExtraFeesRepository)
    public extraFeesRepository: ExtraFeesRepository,
    @repository(BillsRepository)
    public billsRepository: BillsRepository,
    @repository(PeopleRepository)
    public people : PeopleRepository,
    @service(NotificationService)
    public notificationService: NotificationService
  ) {}

  /*
   * Add service methods here
   */

  async crearFactura(id_property:any): Promise<number>{
    const administrationCost=(await this.propertysRepository.findById(id_property)).administrationCost;
    let total=administrationCost;
    const penalties= (await this.penaltiesRepository.findOne({where:{propertiesId: id_property}}));
    const creditNotes= (await this.creditNotesRepository.findOne({where:{propertiesId: id_property}}));
    const debitNotes= (await this.debitNotesRepository.findOne({where:{propertiesId: id_property}}));
    const extraFeeds= (await this.debitNotesRepository.findOne({where:{propertiesId: id_property}}));

    if(penalties){
      total+=penalties.value;
      //Eliminar los registros
      this.penaltiesRepository.deleteById(penalties.id)
    }
    if(creditNotes){
      total-=creditNotes.value;
       this.creditNotesRepository.deleteById(creditNotes.id)
    }
    if(debitNotes){
      total+=debitNotes.value;
       this.debitNotesRepository.deleteById(debitNotes.id)
    }
    if(extraFeeds){
      total+=extraFeeds.value;
       this.extraFeesRepository.deleteById(extraFeeds.id)
    }

 return total;
 }
  async createAllBills(paymentDeadLine:any, message:any){
    const propertys= await this.propertysRepository.find()
    propertys.forEach( async (property) =>{
      const total=await this.crearFactura(property.id)
     this.billsRepository.create({
      "paymentDeadline": paymentDeadLine,
      "message":message,
      "propertiesId": property.id,
      "total": total
     })
     let person = await this.people.findById(property.habitantId);
     let messages = `Hola ${person.firstName}, su factura ha sido generada por un valor de $${total} pesos`;
     let destination = person.phoneNumber;
     this.notificationService.sendSmsMessage(messages, destination);

    })
  }
}
