import { IsArray, IsNumber, IsObject, IsString, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsObject()
  delivery: Record<string, any>;

  @IsNumber()
  total: number;
}

export class UpdateOrderStatusDto {
  @IsString()
  status: string;
}
