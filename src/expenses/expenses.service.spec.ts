import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import mongoose, { Model } from 'mongoose';
import { Expense } from './schema/expense.entity';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';

describe('ExpensesService', () => {
  let expensesService: ExpensesService;
  let expenseModel: Model<Expense>;

  const mockExpenseModel = {
    findById: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  }

  const mockExpense = {
    _id: '65e98e48fdfb3dd0f1f46a0d',
    title: 'test',
    cost: 100,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  }

  const mockCreateExpenseDto = {
    title: 'test',
    cost: 100,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpensesService, {
        provide: getModelToken(Expense.name),
        useValue: mockExpenseModel,
      }],
    }).compile();

    expensesService = module.get<ExpensesService>(ExpensesService);
    expenseModel = module.get<Model<Expense>>(getModelToken(Expense.name));
  });

  describe('create', () => { 
    it('should create an expense', async () => {
      jest.spyOn(expenseModel, 'create').mockResolvedValue(mockExpense); // Expects different argument, but what argument?
      const expense = await expensesService.create(mockCreateExpenseDto);

      expect(expense).toBe(mockExpense);
    })
   })

describe('findAll', () => { 
  it('should return all expenses', async () => {
    jest.spyOn(expenseModel, 'find').mockResolvedValue([mockExpense]);
    const expenses = await expensesService.findAll();

    expect(expenses).toEqual([mockExpense]);
  })

  it('should return empty array if no expenses exist', async () => {
    jest.spyOn(expenseModel, 'find').mockResolvedValue([]);
    const expenses = await expensesService.findAll();

    expect(expenses).toEqual([]);
  })
 })


  
  describe('findOne', () => {
    it('should return an expense if expense exists', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue(mockExpense);
      const expense = await expensesService.findOne(mockExpense._id);
      
      expect(expense).toBe(mockExpense);
    })

    it('should throw an error if expense does not exist', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValue(null); 
      await expect(expensesService.findOne(mockExpense._id)).rejects.toThrow(BadRequestException);
    });


});

describe('update', () => { 
  it('should update an expense', async () => {
    jest.spyOn(expenseModel, 'findByIdAndUpdate').mockResolvedValue(mockExpense);
    const expense = await expensesService.update(mockExpense._id, mockCreateExpenseDto);

    expect(expense).toBe(mockExpense);
  })
 })

 it('should throw an error if expense does not exist', async () => {
  jest.spyOn(expenseModel, 'findByIdAndUpdate').mockResolvedValue(null); 
  await expect(expensesService.update(mockExpense._id, mockCreateExpenseDto)).rejects.toThrow(BadRequestException);
  
});

describe('remove', () => {
  it('should remove an expense', async () => {
    jest.spyOn(expenseModel, 'findByIdAndDelete').mockResolvedValue(mockExpense);
    const expense = await expensesService.remove(mockExpense._id);

    expect(expense).toBe(mockExpense);
  })
 })

 it('should throw an error if expense does not exist', async () => {
  jest.spyOn(expenseModel, 'findByIdAndDelete').mockResolvedValue(null); 
  await expect(expensesService.remove(mockExpense._id)).rejects.toThrow(BadRequestException);
});

});


