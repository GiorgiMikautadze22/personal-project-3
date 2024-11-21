import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from './expenses/expenses.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ExpensesModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI)], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
