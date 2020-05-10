import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
import { Project } from './project.entity';
import { Contribution } from './contribution.entity';
import { SkillCatalog } from '../../models/enums/skill-catalog.enum';
import { Skill } from './skill.entity';
  
  @Entity('requirement')
  export class Requirement {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ nullable: false, type: 'enum', enum: SkillCatalog, default: SkillCatalog.Empty })
    public requiredSkill: Skill;
  
    @Column({ default: false })
    public statusCompleted: boolean;

    @Column({ default: 0 })
    public requiredTime: number;

    @Column({ default: 0 })
    public contributedTime: number;

    @Column({ default: 0 })
    public totalDailyWorkInput: number;

    @ManyToOne(
      type => Project,
      project => project.requirements,
    )
    public project: Project;

    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public createdOn: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updatedOn: Date;

    @OneToMany(
        type => Contribution,
        contribution => contribution.id,
        { eager: true }
    )
    public contributors: Contribution[];
    
    @Column({ default: false })
    public isDeleted: boolean;

  }
  