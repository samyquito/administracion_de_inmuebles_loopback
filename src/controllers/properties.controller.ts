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
import {serialize} from 'v8';
import {Properties} from '../models';
import {ApartmentTowersRepository, CondominiumsRepository, PropertiesRepository} from '../repositories';
import {PropertyCalcultionsService} from '../services';

export class PropertiesController {
  constructor(
    @repository(PropertiesRepository)
    public propertiesRepository: PropertiesRepository,
    @service(PropertyCalcultionsService)
    public propertyService: PropertyCalcultionsService,

  ) { }

  @post('/properties')
  @response(200, {
    description: 'Properties model instance',
    content: {'application/json': {schema: getModelSchemaRef(Properties)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Properties, {
            title: 'NewProperties',
            exclude: ['id', 'coefficient','administrationCost'],
          }),
        },
      },
    })
    properties:  Omit<Properties, 'id'>,
  ): Promise<Properties> {
    
    // const {area, apartmentTowersId} = properties;
    const coefficient=await this.propertyService.GenerateCoefficient(properties.apartmentTowersId,properties.area)
    properties.coefficient =coefficient;
    properties.administrationCost=await this.propertyService.GenerateAdministrationCost(coefficient,properties.apartmentTowersId);

    return this.propertiesRepository.create(properties);
  }

  @get('/properties/count')
  @response(200, {
    description: 'Properties model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Properties) where?: Where<Properties>,
  ): Promise<Count> {
    return this.propertiesRepository.count(where);
  }

  @get('/properties')
  @response(200, {
    description: 'Array of Properties model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Properties, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Properties) filter?: Filter<Properties>,
  ): Promise<Properties[]> {
    return this.propertiesRepository.find(filter);
  }

  @patch('/properties')
  @response(200, {
    description: 'Properties PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Properties, {partial: true}),
        },
      },
    })
    properties: Properties,
    @param.where(Properties) where?: Where<Properties>,
  ): Promise<Count> {
    return this.propertiesRepository.updateAll(properties, where);
  }

  @get('/properties/{id}')
  @response(200, {
    description: 'Properties model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Properties, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Properties, {exclude: 'where'}) filter?: FilterExcludingWhere<Properties>
  ): Promise<Properties> {
    return this.propertiesRepository.findById(id, filter);
  }

  @patch('/properties/{id}')
  @response(204, {
    description: 'Properties PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Properties, {partial: true}),
        },
      },
    })
    properties: Properties,
  ): Promise<void> {
    await this.propertiesRepository.updateById(id, properties);
  }

  @put('/properties/{id}')
  @response(204, {
    description: 'Properties PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() properties: Properties,
  ): Promise<void> {
    await this.propertiesRepository.replaceById(id, properties);
  }

  @del('/properties/{id}')
  @response(204, {
    description: 'Properties DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.propertiesRepository.deleteById(id);
  }
}
