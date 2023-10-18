import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { MyConfigModule } from '@Config/config.module';
import { DatabaseModule } from '@Database/database.module';
import { MyEmitterModule } from '@Emitter/emitter.module';
import { HttpExceptionFilter } from '@Filters/http-exception.filter';
import { LoggingMiddleware } from '@Middlewares/logging.midlleware';
import { Modules } from '@Modules/index';

@Module({
  imports: [MyConfigModule, DatabaseModule, MyEmitterModule, ...Modules],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
