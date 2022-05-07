import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources/mysql.datasource';
import {Properties, PropertiesRelations, ApartmentTowers, UtilityRooms, ParkingLots, People, ExtraFess} from '../models';
import {ApartmentTowersRepository} from './apartment-towers.repository';
import {UtilityRoomsRepository} from './utility-rooms.repository';
import {ParkingLotsRepository} from './parking-lots.repository';
import {PeopleRepository} from './people.repository';
import {ExtraFessRepository} from './extra-fess.repository';

export class PropertiesRepository extends DefaultCrudRepository<
  Properties,
  typeof Properties.prototype.id,
  PropertiesRelations
> {

  public readonly apartmentTowers: BelongsToAccessor<ApartmentTowers, typeof Properties.prototype.id>;

  public readonly utilityRooms: HasOneRepositoryFactory<UtilityRooms, typeof Properties.prototype.id>;

  public readonly parkingLots: HasOneRepositoryFactory<ParkingLots, typeof Properties.prototype.id>;

  public readonly habitant: BelongsToAccessor<People, typeof Properties.prototype.id>;

  public readonly extraFesses: HasManyRepositoryFactory<ExtraFess, typeof Properties.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ApartmentTowersRepository') protected apartmentTowersRepositoryGetter: Getter<ApartmentTowersRepository>, @repository.getter('UtilityRoomsRepository') protected utilityRoomsRepositoryGetter: Getter<UtilityRoomsRepository>, @repository.getter('ParkingLotsRepository') protected parkingLotsRepositoryGetter: Getter<ParkingLotsRepository>, @repository.getter('PeopleRepository') protected peopleRepositoryGetter: Getter<PeopleRepository>, @repository.getter('ExtraFessRepository') protected extraFessRepositoryGetter: Getter<ExtraFessRepository>,
  ) {
    super(Properties, dataSource);
    this.extraFesses = this.createHasManyRepositoryFactoryFor('extraFesses', extraFessRepositoryGetter,);
    this.registerInclusionResolver('extraFesses', this.extraFesses.inclusionResolver);
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
