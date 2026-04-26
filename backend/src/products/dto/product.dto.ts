import { IsString, IsNumber, IsEnum, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  image: string;

  @IsEnum(['bread', 'pastries', 'cakes'])
  category: 'bread' | 'pastries' | 'cakes';

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsNumber()
  rating?: number;
}

export class UpdateProductDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsNumber() @Min(0) price?: number;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsEnum(['bread', 'pastries', 'cakes']) category?: 'bread' | 'pastries' | 'cakes';
  @IsOptional() @IsNumber() @Min(0) stock?: number;
  @IsOptional() @IsNumber() rating?: number;
}
