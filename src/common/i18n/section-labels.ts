import { Section } from '../enums/section.enum';
import { Subsection } from '../enums/subsection.enum';

export const SECTION_LABEL_KO: Record<Section, string> = {
  [Section.Politics]: '정치',
  [Section.Business]: '경제',
  [Section.Industry]: '산업',
  [Section.Society]: '사회',
  [Section.Local]: '전국',
  [Section.World]: '세계',
  [Section.Culture]: '문화',
  [Section.Sports]: '스포츠',
  [Section.Health]: '건강',
  [Section.Entertainment]: '연예',
  [Section.Opinion]: '오피니언',
};

export const SUBSECTION_LABEL_KO: Record<Subsection, string> = {
  // Politics
  [Subsection.PresidentialOffice]: '대통령실/총리실',
  [Subsection.Assembly]: '국회/정당',
  [Subsection.Diplomacy]: '외교',
  [Subsection.Defense]: '국방',
  // Business/Economy
  [Subsection.Finance]: '금융',
  [Subsection.RealEstate]: '부동산',
  [Subsection.JobsStartup]: '취업/창업',
  [Subsection.Consumer]: '소비자',
  // Industry
  [Subsection.Electronics]: '전기전자',
  [Subsection.HeavyChem]: '중화학',
  [Subsection.Automobile]: '자동차',
  [Subsection.Construction]: '건설',
  [Subsection.EnergyResources]: '에너지/자원',
  [Subsection.TechScience]: 'IT/과학',
  [Subsection.Game]: '게임',
  [Subsection.RetailService]: '유통/서비스',
  [Subsection.SmbVenture]: '중기/벤처',
  [Subsection.BioHealth]: '바이오/헬스',
  [Subsection.AgriLivestock]: '농림축산',
  [Subsection.MarineFishery]: '해양수산',
  // Local
  [Subsection.Gyeonggi]: '경기',
  [Subsection.Ulsan]: '울산',
  [Subsection.Gyeongnam]: '경남',
  [Subsection.DaeguGyeongbuk]: '대구/경북',
  [Subsection.GwangjuJeonnam]: '광주/전남',
  [Subsection.Jeonbuk]: '전북',
  [Subsection.DaejeonChungnamSejong]: '대전/충남/세종',
  [Subsection.Chungbuk]: '충북',
  [Subsection.Gangwon]: '강원',
  [Subsection.Gwangju]: '광주',
  [Subsection.Busan]: '부산',
  [Subsection.Incheon]: '인천',
  [Subsection.Jeju]: '제주',
  // World
  [Subsection.USNA]: '미국/북미',
  [Subsection.China]: '중국',
  [Subsection.Japan]: '일본',
  [Subsection.AsiaAU]: '아시아/호주',
  [Subsection.EU]: '유럽',
  [Subsection.LATAM]: '중남미',
  [Subsection.MEA]: '중동/아프리카',
  [Subsection.IGO]: '국제기구',
  // Society
  [Subsection.Incident]: '사건/사고',
  [Subsection.CourtProsecution]: '법원/검찰',
  [Subsection.Education]: '교육',
  [Subsection.WelfareLabor]: '복지/노동',
  [Subsection.EnvironmentClimate]: '환경/기후변화',
  [Subsection.WomenChildren]: '여성/아동',
  [Subsection.OverseasKorean]: '재외동포',
  [Subsection.Multicultural]: '다문화',
  // Culture
  [Subsection.BooksLit]: '책/문학',
  [Subsection.ComicsWebtoon]: '만화/웹툰',
  [Subsection.Religion]: '종교',
  [Subsection.PerformanceExhibition]: '공연/전시',
  [Subsection.AcademiaHeritage]: '학술/문화재',
  [Subsection.Media]: '미디어',
  [Subsection.TravelLeisure]: '여행/레저',
  [Subsection.Life]: '생활',
  // Entertainment
  [Subsection.Broadcast]: '방송',
  [Subsection.Movie]: '영화',
  [Subsection.KPop]: '가요',
  [Subsection.GlobalEnt]: '해외연예',
  // Sports
  [Subsection.Baseball]: '야구',
  [Subsection.Football]: '축구',
  [Subsection.BasketballVolleyball]: '농구/배구',
  [Subsection.Golf]: '골프',
  // Health
  [Subsection.HealthNote]: '헬스노트',
  [Subsection.WeeklyHealth]: '위클리 건강',
  // Opinion
  [Subsection.Editorial]: '사설',
  [Subsection.Column]: '칼럼',
};

export function sectionLabelKo(section: Section): string {
  return SECTION_LABEL_KO[section] ?? section;
}

export function subsectionLabelKo(sub: Subsection): string {
  return SUBSECTION_LABEL_KO[sub] ?? sub;
}
