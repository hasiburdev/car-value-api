import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '@prisma/client';
import { GetEstimateDto } from './dtos/create-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(reportDto: CreateReportDto, user: User) {
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
          authorId: user.id,
        },
      });
      return report;
    } catch (error) {
      console.log(error);
    }
  }

  async changeApproval(id: string, user: User, approved: boolean) {
    try {
      const report = await this.prisma.report.update({
        where: { id },
        data: { approved },
      });
      return report;
    } catch (error) {
      throw new NotFoundException('Report not found');
    }
  }

  async createEstimate({
    make,
    model,
    year,
    latitude,
    longitude,
  }: GetEstimateDto) {
    const result = await this.prisma.report.aggregate({
      _avg: {
        price: true,
      },
      where: {
        AND: [
          { make },
          { model },
          {
            year: {
              lte: year + 3,
              gte: year - 3,
            },
          },
          {
            latitude: {
              lte: latitude + 5,
              gte: latitude - 5,
            },
            longitude: {
              lte: longitude + 5,
              gte: longitude - 5,
            },
          },
        ],
      },

      orderBy: {
        milage: 'desc',
      },
      take: 3,
    });
    return result._avg.price;
  }
}
