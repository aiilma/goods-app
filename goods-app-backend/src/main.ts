import { NestFactory } from '@nestjs/core';
import { GoodsModule } from './goods/goods.module';

async function bootstrap() {
  const app = await NestFactory.create(GoodsModule);
  app.enableCors({
    // origin: 'next_address'
  })
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
