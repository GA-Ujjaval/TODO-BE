import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:true,
  });
  const options = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };
  // app.enableCors(options);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'https://todo-omega-sepia.vercel.app',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
