import {
  IsString,
  IsNumber,
  IsLongitude,
  IsLatitude,
  Max,
  Min,
} from 'class-validator';
export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(2030)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  milage: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
