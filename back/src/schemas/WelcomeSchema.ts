import { IsNumber, IsOptional, Length } from 'class-validator';

export class WelcomeSchema {

    @Length(10, 35)
    public name: string;

    @IsNumber()
    @IsOptional()
    public age: number;
}
