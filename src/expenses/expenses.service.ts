import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schema/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const createdExpense = await this.expenseModel.create(createExpenseDto);
    const savedExpense = await createdExpense.save();
    
    return savedExpense;
  }

  findAll() {
    return this.expenseModel.find();
  }

  async findOne(id: string) {
    const expense = await this.expenseModel.findById(id);

    if(!expense) {
      throw new BadRequestException("Expense not found");
    }

    return expense
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, {new: true});

    if(!expense) {
      throw new BadRequestException("Expense not found");
    }

    return expense;
  }

  async remove(id: string) {
    const expense = await this.expenseModel.findByIdAndDelete(id);
    if(!expense) {
      throw new BadRequestException("Expense not found");
    }

    return expense;
  }
}
