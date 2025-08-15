import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticlesService } from '../articles/articles.service';
import { Section } from '../common/enums/section.enum';
import { Subsection } from '../common/enums/subsection.enum';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  private nextSectionIndex = 0;
  private readonly rotation: Array<{
    section: Section;
    subsections: Subsection[];
  }> = [
    {
      section: Section.Politics,
      subsections: [
        Subsection.PresidentialOffice,
        Subsection.Assembly,
        Subsection.Diplomacy,
        Subsection.Defense,
      ],
    },
    {
      section: Section.Business,
      subsections: [
        Subsection.Finance,
        Subsection.RealEstate,
        Subsection.JobsStartup,
        Subsection.Consumer,
      ],
    },
    {
      section: Section.Industry,
      subsections: [
        Subsection.Electronics,
        Subsection.HeavyChem,
        Subsection.Automobile,
        Subsection.Construction,
        Subsection.EnergyResources,
        Subsection.TechScience,
        Subsection.Game,
        Subsection.RetailService,
        Subsection.SmbVenture,
        Subsection.BioHealth,
        Subsection.AgriLivestock,
        Subsection.MarineFishery,
      ],
    },
    {
      section: Section.Local,
      subsections: [
        Subsection.Gyeonggi,
        Subsection.Incheon,
        Subsection.Busan,
        Subsection.Ulsan,
        Subsection.Gyeongnam,
        Subsection.DaeguGyeongbuk,
        Subsection.GwangjuJeonnam,
        Subsection.Jeonbuk,
        Subsection.DaejeonChungnamSejong,
        Subsection.Chungbuk,
        Subsection.Gangwon,
        Subsection.Jeju,
      ],
    },
    {
      section: Section.World,
      subsections: [
        Subsection.USNA,
        Subsection.China,
        Subsection.Japan,
        Subsection.AsiaAU,
        Subsection.EU,
        Subsection.LATAM,
        Subsection.MEA,
        Subsection.IGO,
      ],
    },
    {
      section: Section.Society,
      subsections: [
        Subsection.Incident,
        Subsection.CourtProsecution,
        Subsection.Education,
        Subsection.WelfareLabor,
        Subsection.EnvironmentClimate,
        Subsection.WomenChildren,
        Subsection.OverseasKorean,
        Subsection.Multicultural,
      ],
    },
    {
      section: Section.Culture,
      subsections: [
        Subsection.BooksLit,
        Subsection.ComicsWebtoon,
        Subsection.Religion,
        Subsection.PerformanceExhibition,
        Subsection.AcademiaHeritage,
        Subsection.Media,
        Subsection.TravelLeisure,
        Subsection.Life,
      ],
    },
    {
      section: Section.Entertainment,
      subsections: [
        Subsection.Broadcast,
        Subsection.Movie,
        Subsection.KPop,
        Subsection.GlobalEnt,
      ],
    },
    {
      section: Section.Sports,
      subsections: [
        Subsection.Baseball,
        Subsection.Football,
        Subsection.BasketballVolleyball,
        Subsection.Golf,
      ],
    },
    {
      section: Section.Health,
      subsections: [Subsection.HealthNote, Subsection.WeeklyHealth],
    },
  ];

  constructor(private readonly articlesService: ArticlesService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async generateArticleJob() {
    const pair = this.rotation[this.nextSectionIndex];
    const section = pair.section;
    const subsection =
      pair.subsections[Math.floor(Math.random() * pair.subsections.length)];
    this.nextSectionIndex = (this.nextSectionIndex + 1) % this.rotation.length;

    this.logger.log(
      `AI 기사 생성 시작 - section=${section}, subsection=${subsection}`,
    );
    const generated = await this.articlesService.generateArticle(
      section,
      subsection,
    );
    this.logger.log(`AI 기사 생성 완료 - id=${generated.id}`);
  }
}
