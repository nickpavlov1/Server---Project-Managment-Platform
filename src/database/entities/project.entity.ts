import { Requirement } from './requirement.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public title: string;

  @Column({ nullable: false })
  public description: string;

  @Column({ nullable: false, default: false })
  public statusCompleted: boolean;

  @Column({ nullable: false })
  public due: number;

  @Column({ nullable: false })
  public dailyHourlyManagerContribution: number;

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

  @Column({ nullable: true, type: 'date' })
  public dueDate: Date;

  @Column({ nullable: true, type: 'date' })
  public finishesOn: Date;

  @Column({ default: false })
  public isStopped: boolean;

  @ManyToOne(
    type => User,
    user => user.projects,
    {eager: true}
  )
  public manager: User;

  @OneToMany(
    type => Requirement, 
    requirement => requirement.project,
    {eager: true}
  )
  public requirements: Requirement[];

}
