import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true, // fixme can lose prod data, so need to turn off by cond
            entities: [
              __dirname + '/../**/*.entity{.ts,.js}',
            ],
          });
          await dataSource.initialize();

          console.log('db: connected');
          return dataSource;
        } catch (error) {
          console.log('db: connection error');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {
}