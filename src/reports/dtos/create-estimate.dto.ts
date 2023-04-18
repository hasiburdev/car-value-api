import {
  IsString,
  IsNumber,
  IsLongitude,
  IsLatitude,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1900)
  @Max(2030)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  milage: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  latitude: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  longitude: number;
}
