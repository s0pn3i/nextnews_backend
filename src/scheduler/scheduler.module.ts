import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [ScheduleModule.forRoot(), ArticlesModule],
  providers: [SchedulerService],
})
export class SchedulerJobModule {}
