import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Properties, PropertiesRelations, ApartmentTowers, UtilityRooms, ParkingLots, People} from '../models';
import {ApartmentTowersRepository} from './apartment-towers.repository';
import {UtilityRoomsRepository} from './utility-rooms.repository';
import {ParkingLotsRepository} from './parking-lots.repository';
import {PeopleRepository} from './people.repository';

export class PropertiesRepository extends DefaultCrudRepository<
  Properties,
  typeof Properties.prototype.id,
  PropertiesRelations
> {

  public readonly apartmentTowers: BelongsToAccessor<ApartmentTowers, typeof Properties.prototype.id>;

  public readonly utilityRooms: HasOneRepositoryFactory<UtilityRooms, typeof Properties.prototype.id>;

  public readonly parkingLots: HasOneRepositoryFactory<ParkingLots, typeof Properties.prototype.id>;

  public readonly habitant: BelongsToAccessor<People, typeof Properties.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ApartmentTowersRepository') protected apartmentTowersRepositoryGetter: Getter<ApartmentTowersRepository>, @repository.getter('UtilityRoomsRepository') protected utilityRoomsRepositoryGetter: Getter<UtilityRoomsRepository>, @repository.getter('ParkingLotsRepository') protected parkingLotsRepositoryGetter: Getter<ParkingLotsRepository>, @repository.getter('PeopleRepository') protected peopleRepositoryGetter: Getter<PeopleRepository>,
  ) {
    super(Properties, dataSource);
    this.habitant = this.createBelongsToAccessorFor('habitant', peopleRepositoryGetter,);
    this.registerInclusionResolver('habitant', this.habitant.inclusionResolver);
    this.parkingLots = this.createHasOneRepositoryFactoryFor('parkingLots', parkingLotsRepositoryGetter);
    this.registerInclusionResolver('parkingLots', this.parkingLots.inclusionResolver);
    this.utilityRooms = this.createHasOneRepositoryFactoryFor('utilityRooms', utilityRoomsRepositoryGetter);
    this.registerInclusionResolver('utilityRooms', this.utilityRooms.inclusionResolver);
    this.apartmentTowers = this.createBelongsToAccessorFor('apartmentTowers', apartmentTowersRepositoryGetter,);
    this.registerInclusionResolver('apartmentTowers', this.apartmentTowers.inclusionResolver);
  }
}
