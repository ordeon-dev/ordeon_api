import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBudgetDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNumber()
    @IsNotEmpty()
    amount: number;
    
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}
