import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {AllBills, Bills} from '../models';
import {BillsRepository, PeopleRepository, PropertiesRepository} from '../repositories';
import {InvoicesValuesService, NotificationService} from '../services';

@authenticate('admin')
export class BillsController {
  constructor(
    @repository(BillsRepository)
    public billsRepository: BillsRepository,
    @service(InvoicesValuesService)
    public invoiceValueService: InvoicesValuesService,
    @repository(PeopleRepository)
    public peopleRepository: PeopleRepository,
    @repository(PropertiesRepository)
    public propertiesRepository: PropertiesRepository,
    @service(NotificationService)
    public notificationService: NotificationService
  ) { }

  @post('/bills')
  @response(200, {
    description: 'Bills model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bills)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bills, {
            title: 'NewBills',
            exclude: ['id', 'total'],
          }),
        },
      },
    })
    bills: Omit<Bills, 'id'>,
  ): Promise<Bills> {
    const id_property = bills.propertiesId;
    bills.total = await this.invoiceValueService.crearFactura(id_property);
    let property = await this.propertiesRepository.findById(id_property);
    let person = await this.peopleRepository.findById(property.habitantId);
    let message = `Hola ${person.firstName}, su factura ha sido generada`;
    let destination = person.phoneNumber;
    this.notificationService.sendSmsMessage(message, destination);
    return this.billsRepository.create(bills);
  }
  @post('/allBills')
  @response(200, {
    description: 'AllBills model instance',
    content: {'application/json': {schema: getModelSchemaRef(AllBills)}},
  })
  async createAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AllBills, {
            title: 'AllBills',
          }),
        },
      },
    })
    bills: AllBills
  ): Promise<boolean> {
    this.invoiceValueService.createAllBills(bills.paymentDeadLine, bills.message)
    return true
  }
  //Crear un post para crear todas las facturas a la vez

  @get('/bills/count')
  @response(200, {
    description: 'Bills model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bills) where?: Where<Bills>,
  ): Promise<Count> {
    return this.billsRepository.count(where);
  }

  @get('/bills')
  @response(200, {
    description: 'Array of Bills model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bills, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bills) filter?: Filter<Bills>,
  ): Promise<Bills[]> {
    return this.billsRepository.find(filter);
  }

  @patch('/bills')
  @response(200, {
    description: 'Bills PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bills, {partial: true}),
        },
      },
    })
    bills: Bills,
    @param.where(Bills) where?: Where<Bills>,
  ): Promise<Count> {
    return this.billsRepository.updateAll(bills, where);
  }

  @get('/bills/{id}')
  @response(200, {
    description: 'Bills model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bills, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Bills, {exclude: 'where'}) filter?: FilterExcludingWhere<Bills>
  ): Promise<Bills> {
    return this.billsRepository.findById(id, filter);
  }

  @patch('/bills/{id}')
  @response(204, {
    description: 'Bills PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bills, {partial: true}),
        },
      },
    })
    bills: Bills,
  ): Promise<void> {
    await this.billsRepository.updateById(id, bills);
  }

  @put('/bills/{id}')
  @response(204, {
    description: 'Bills PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bills: Bills,
  ): Promise<void> {
    await this.billsRepository.replaceById(id, bills);
  }

  @del('/bills/{id}')
  @response(204, {
    description: 'Bills DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.billsRepository.deleteById(id);
  }
}
