import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { GetArticlesQueryDto } from './dto/get-articles.query.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOperation({ summary: '기사 목록' })
  @ApiQuery({
    name: 'section',
    required: false,
    enum: [
      'politics',
      'business',
      'industry',
      'society',
      'local',
      'world',
      'culture',
      'sports',
      'health',
      'entertainment',
      'opinion',
      'people',
    ],
  })
  @ApiQuery({
    name: 'subsection',
    required: false,
    enum: [
      'presidential-office',
      'assembly',
      'diplomacy',
      'defense',
      'finance',
      'real-estate',
      'jobs-startup',
      'consumer',
      'electronics',
      'heavy-chem',
      'automobile',
      'construction',
      'energy-resources',
      'tech-science',
      'game',
      'retail-service',
      'smb-venture',
      'bio-health',
      'agri-livestock',
      'marine-fishery',
      'gwangju',
      'busan',
      'incheon',
      'daegu',
      'jeju',
      'us-na',
      'cn',
      'jp',
      'asia-au',
      'eu',
      'latam',
      'mea',
      'igo',
      'incident',
      'court-prosecution',
      'education',
      'welfare-labor',
      'environment-climate',
      'women-children',
      'overseas-korean',
      'multicultural',
      'books-lit',
      'comics-webtoon',
      'religion',
      'performance-exhibition',
      'academia-heritage',
      'media',
      'travel-leisure',
      'life',
      'broadcast',
      'movie',
      'kpop',
      'global-ent',
      'baseball',
      'football',
      'basketball-volleyball',
      'golf',
    ],
  })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['latest', 'views'] })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getArticles(@Query() query: GetArticlesQueryDto) {
    return this.articlesService.getArticles(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '기사 상세' })
  getArticleById(@Param('id') id: string) {
    return this.articlesService.getArticleById(Number(id));
  }
}
