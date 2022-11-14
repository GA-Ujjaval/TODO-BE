import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ 
    origin: ['https://todo-omega-sepia.vercel.app', 'https://www.google.com'],
    credentials:true
  });
  
  await app.listen(3000);
}
bootstrap();
