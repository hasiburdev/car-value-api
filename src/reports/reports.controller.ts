import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/create-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Serialize(ReportDto)
  approveReport(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() body: ApproveReportDto,
  ) {
    try {
      return this.reportsService.changeApproval(id, user, body.approved);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }
}
