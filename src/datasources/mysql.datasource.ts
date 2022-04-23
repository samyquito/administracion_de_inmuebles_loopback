import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as fs from 'fs';

const config = {
  name: 'mysql',
  connector: 'mysql',
  url: '',
  host: 'turismodb.mysql.database.azure.com',
  port: 3306,
  user: 'turismo_user',
  password: '18082002Juan',
  database: 'turismdb',
  ssl: {
    ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
  }
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
