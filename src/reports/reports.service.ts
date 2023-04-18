import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(reportDto: CreateReportDto, userId: string) {
    try {
      const { make, model, year, milage, price, latitude, longitude } =
        reportDto;
      const report = await this.prisma.report.create({
        data: {
          make,
          model,
          year,
          milage,
          price,
          latitude,
          longitude,
          authorId: userId,
        },
      });
      return report;
    } catch (error) {
      console.log(error);
    }
  }
}
