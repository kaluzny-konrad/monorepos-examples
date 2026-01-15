import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend apps
  // In development, allow all origins to support physical devices on local network
  const isDevelopment = process.env.NODE_ENV !== 'production';
  app.enableCors({
    origin: isDevelopment
      ? true
      : [
          'http://localhost:3000',
          'http://localhost:8081',
          'http://localhost:19006',
        ],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port, "0.0.0.0"); // Listen on all network interfaces
  
  console.log(`🚀 Backend server running on http://0.0.0.0:${port}`);
  console.log(`📱 For physical devices, use your local IP: http://<your-local-ip>:${port}`);
  console.log(`🌐 CORS enabled for development: ${isDevelopment ? "all origins" : "specific origins"}`);
}
void bootstrap();
