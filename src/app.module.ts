import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { sqliteConfig } from './ormconfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(sqliteConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
