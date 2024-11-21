import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Expense {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    cost: number;

    @Prop()
    createdAt: string;

    @Prop()
    updatedAt: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
