import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {resourceUsage} from 'process';
import {CreditNotesRepository, DebitNotesRepository, ExtraFeesRepository, PenaltiesRepository, PropertiesRepository} from '../repositories';

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
    public extraFeesRepository: ExtraFeesRepository
  ) {}

  /*
   * Add service methods here
   */

  async crearFactura(id_property:number): Promise<number>{
    const administrationCost=(await this.propertysRepository.findById(id_property)).administrationCost;
    let total=administrationCost;
    const penalties= (await this.penaltiesRepository.findOne({where:{propertiesId: id_property}}))?.value
    const creditNotes= (await this.creditNotesRepository.findOne({where:{propertiesId: id_property}}))?.value
    const debitNotes= (await this.debitNotesRepository.findOne({where:{propertiesId: id_property}}))?.value
    const extraFeeds= (await this.debitNotesRepository.findOne({where:{propertiesId: id_property}}))?.value

    if(penalties){
      total+=penalties;
    }
    if(creditNotes){
      total-=creditNotes;
    }
    if(debitNotes){
      total+=debitNotes
    }
    if(extraFeeds){
      total+=extraFeeds
    }

 return total
 }
}
