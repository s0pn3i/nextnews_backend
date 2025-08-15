import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { GetArticlesQueryDto } from './dto/get-articles.query.dto';
import { Section } from '../common/enums/section.enum';
import { Subsection } from '../common/enums/subsection.enum';
import {
  sectionLabelKo,
  subsectionLabelKo,
} from '../common/i18n/section-labels';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,

    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}

  async getArticles(query: GetArticlesQueryDto) {
    const qb = this.articleRepository.createQueryBuilder('a');
    if (query.section) {
      qb.where('a.section = :section', { section: query.section });
    }
    if (query.subsection) {
      qb.andWhere('a.subsection = :subsection', {
        subsection: query.subsection,
      });
    }
    const sortBy = query.sortBy === 'views' ? 'a.views' : 'a.createdAt';
    qb.orderBy(sortBy, 'DESC');
    qb.offset(query.offset ?? 0);
    qb.limit(query.limit ?? 20);
    const [items, total] = await Promise.all([
      qb.getMany(),
      this.articleRepository.count({
        where: {
          ...(query.section ? { section: query.section } : {}),
          ...(query.subsection ? { subsection: query.subsection } : {}),
        },
      }),
    ]);
    return {
      items,
      total,
      offset: query.offset ?? 0,
      limit: query.limit ?? 20,
    };
  }

  async getArticleById(id: number) {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    this.articleRepository.update({ id }, { views: article.views + 1 });
    return this.articleRepository.findOne({ where: { id } });
  }

  // AI 기사 생성: 섹션/서브섹션을 받아 제목/본문을 생성하고 저장
  async generateArticle(section: Section, subsection: Subsection) {
    const client = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
    const response = await client.responses.create({
      model: this.configService.get('OPENAI_MODEL'),
      tools: [{ type: 'web_search_preview' }],
      input: `너는 기자다. 대한민국의 '${sectionLabelKo(section)}' 섹션 중 '${subsectionLabelKo(subsection)}' 주제 관련 최신 뉴스(7일 이내)를 폭넓게 검색해, 관심이 집중될 만한 하나를 선정한다.\n- 기사에는 출처나 URL을 절대 포함하지 말 것.\n- 문장은 자연스러운 문단 흐름으로 구성.\n- 제목은 20~40자로 간결하고 정보 중심.\n- 본문은 900~1300자로 작성.\n- 민감/오보 주의: 사실 기반으로 신중히 작성.\n- 출력은 {"title": string, "content": string} 형식의 JSON으로만 응답.`,
    });
    const parsed = JSON.parse(response.output_text ?? '{}');
    console.log(parsed);
    const cleanedContent = this.removeMarkdownLinks(parsed.content ?? '');
    const article = this.articleRepository.create({
      title: parsed.title,
      content: cleanedContent,
      section,
      subsection,
    });
    await this.articleRepository.save(article);
    return article;
  }

  private removeMarkdownLinks(text: string): string {
    if (!text) return text;
    return text.replace(/\(?\[[^\]]+\]\([^\)]+\)\)?/g, '');
  }
}
