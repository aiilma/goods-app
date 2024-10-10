import { NestFactory } from '@nestjs/core';
import { GoodsModule } from './goods/goods.module';

async function bootstrap() {
  const app = await NestFactory.create(GoodsModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
