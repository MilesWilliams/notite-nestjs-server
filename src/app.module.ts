import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './core/config/keys.config';

import { WorkspaceModule } from './workspace/workspace.module';
import { NotesModule } from './notes/notes.module';
import { LoggerMiddleware } from './core/middleware/logger.middleware';

@Module({
  imports: [
    WorkspaceModule,
    NotesModule,
    MongooseModule.forRoot(config.MongoURI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
