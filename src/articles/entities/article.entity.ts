import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Section } from '../../common/enums/section.enum';
import { Subsection } from '../../common/enums/subsection.enum';

@Entity()
@Index(['section', 'subsection'])
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 0 })
  views: number;

  @Column({ type: 'enum', enum: Section, enumName: 'section_enum' })
  section: Section;

  @Column({
    type: 'enum',
    enum: Subsection,
    enumName: 'subsection_enum',
  })
  subsection: Subsection;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
