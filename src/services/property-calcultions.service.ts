import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository} from '@loopback/repository';
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
  async GenerateCoefficient(idTower:any,area:number):Promise<number>{
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
  async GenerateAdministrationCost(coeficiente:number,idTower:any):Promise<number>{

    const tower = await this.apartamentTowersRepository.findById(idTower);
    const condominiums = await this.condominiumsRepository.findById(tower.condominiumsId);
    const administrationCost=(condominiums.area*coeficiente)/100
    return administrationCost *1000
  }
  async updateArea(id_property:any, area:number){
    const propertyArea= (await this.propertyRepository.findById(id_property)).area+ area
   const property= await this.propertyRepository.findOne(id_property)
   const tower=await  this.apartamentTowersRepository.findById(property?.apartmentTowersId)
    const coefficient= await this.GenerateCoefficient(tower.id,propertyArea)
    const administrationCost= await this.GenerateAdministrationCost(coefficient,tower.id)
  this.propertyRepository.updateById(id_property,{
    area:propertyArea,
    coefficient:coefficient,
    administrationCost: administrationCost
  })

  }}
