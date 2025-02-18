import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
    
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsNumber()
    @IsNotEmpty()
    amount: number;
    
    @IsBoolean()
    @IsNotEmpty()
    transactionType: boolean;
    
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}
