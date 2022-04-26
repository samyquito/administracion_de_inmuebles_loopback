import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Payments,
  Bills,
} from '../models';
import {PaymentsRepository} from '../repositories';

export class PaymentsBillsController {
  constructor(
    @repository(PaymentsRepository)
    public paymentsRepository: PaymentsRepository,
  ) { }

  @get('/payments/{id}/bills', {
    responses: {
      '200': {
        description: 'Bills belonging to Payments',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bills)},
          },
        },
      },
    },
  })
  async getBills(
    @param.path.number('id') id: typeof Payments.prototype.id,
  ): Promise<Bills> {
    return this.paymentsRepository.bills(id);
  }
}
