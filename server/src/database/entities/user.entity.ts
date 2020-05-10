import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToMany, CreateDateColumn, OneToOne, ManyToMany, JoinTable } from "typeorm";
import { Skill } from "./skill.entity";
import { Project } from "./project.entity";
import { WorkPosition } from '../../models/enums/work-position.emun';
import { Contribution } from "./contribution.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: true, default: null })
  public password: string;


  @Column()
  public jobTitle: string;

  @Column({ nullable: true, default: null })
  public jobDescription: string;

  @Column({ nullable: true, default: null })
  public salt: string;

  @Column('nvarchar')
  public email: string;

  @Column('nvarchar')
  public firstname: string;

  @Column('nvarchar')
  public lastname: string;

  @Column({ default: 8 })
  public availableWorkHours: number

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public registeredOn: Date;

  @OneToMany(type => Skill, skill => skill.skillName, { eager: true })
  public skills: Skill[];

  @OneToMany(type => Project, project => project.manager, { eager: true })
  public projects: Project[]

  @OneToMany(type => User, user => user.lastname, { eager: true })
  public subordinates: User[]

  @Column({ type: 'enum', enum: WorkPosition, default: WorkPosition.employee })
  public position: WorkPosition;

  @OneToOne(type => User, user => user.lastname)
  public managedBy: Promise<User>

  @OneToMany(type => Contribution, contribution => contribution.id, { eager: true })
  public contributions: Contribution[]
}