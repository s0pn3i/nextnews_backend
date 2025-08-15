import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Section } from '../../common/enums/section.enum';
import { Subsection } from '../../common/enums/subsection.enum';

export class GetArticlesQueryDto {
  @IsOptional()
  @IsEnum(Section)
  section?: Section;

  @IsOptional()
  @IsEnum(Subsection)
  subsection?: Subsection;

  @IsOptional()
  @IsIn(['latest', 'views'])
  sortBy?: 'latest' | 'views' = 'latest';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 20;
}
