import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToMany, CreateDateColumn } from "typeorm";
import { Skill } from "./skill.entity";
import { Project } from "./project.entity";
import { WorkPosition } from '../../models/enums/work-position.emun';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  password: string;

  @Column()
  jobTitle: string;

  @Column({ nullable: true })
  jobDescription: string;

  @Column({ nullable: true })
  salt: string;

  @Column('nvarchar')
  email: string;

  @Column('nvarchar')
  firstname: string;

  @Column('nvarchar')
  lastname: string;

  @Column({ default: 8 })
  availableWorkHours: number

  @Column({ default: WorkPosition.employee })
  workPosition: WorkPosition

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public registeredOn: Date;

  @OneToMany(type => Skill, skill => skill.skillName)
  skills: Skill[];

  @OneToMany(type => Project, project => project.manager)
  projects: Project[]

  @OneToMany(type => User, user => user.lastname)
  subordinates: User[]
}