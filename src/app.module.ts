import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMCofig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMCofig), BoardsModule],
})
export class AppModule {}
