import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {property, repository} from '@loopback/repository';
import {Condominiums} from '../models';
import {ApartmentTowersRepository, CondominiumsRepository, ParkingLotsRepository, PropertiesRepository, UtilityRoomsRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class PropertyCalcultionsService {
  constructor(
  @repository(ApartmentTowersRepository)
  public apartamentTowersRepository: ApartmentTowersRepository,
  @repository(CondominiumsRepository)
  public condominiumsRepository: CondominiumsRepository,
  @repository(PropertiesRepository)
  public propertyRepository: PropertiesRepository,
  @repository(ParkingLotsRepository)
  public parkingLotRepository: ParkingLotsRepository,
  @repository(UtilityRoomsRepository)
  public roomrepository: UtilityRoomsRepository
  ) {}

  /*
   * Add service methods here
   */
  async GenerateCoefficient(idTower:number,area:number):Promise<number>{
    const tower = await this.apartamentTowersRepository.findById(idTower);
    const condominiums = await this.condominiumsRepository.findById(tower.condominiumsId);
    const coeficcient= (area*100)/condominiums.area;
     const parkingLot= await this.parkingLotRepository.findOne({
       where: {
        propertiesId: idTower
       }
     })
     parkingLot?.propertiesId

  return coeficcient;
  }
  async GenerateAdministrationCost(coeficiente:number,idTower:number):Promise<number>{

    const tower = await this.apartamentTowersRepository.findById(idTower);
    const condominiums = await this.condominiumsRepository.findById(tower.condominiumsId);
    const administrationCost=(condominiums.area*coeficiente)/100
    return administrationCost
  }
}
