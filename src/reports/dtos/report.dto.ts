import { Expose } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: string;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  milage: number;

  @Expose()
  price: number;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  authorId: string;
}
