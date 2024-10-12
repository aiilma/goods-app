import { NestFactory } from '@nestjs/core';
import { GoodsModule } from './goods/goods.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GoodsModule);

  app.enableCors({
    // origin: 'next_address'
  })
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(3000);
}
bootstrap();
