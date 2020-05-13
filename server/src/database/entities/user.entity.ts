import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToMany, CreateDateColumn, OneToOne } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Project } from "./project.entity";
import { WorkPosition } from '../../models/enums/work-position.emun';
import { Contribution } from "./contribution.entity";
import { Employee } from './employee.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public password: string;

  @Column()
  public salt: string;

  @Column()
  public jobTitle: string;

  @Column({ nullable: true, default: null })
  public jobDescription: string;
  
  @Column('nvarchar')
  public email: string;

  @Column('nvarchar')
  public firstname: string;

  @Column('nvarchar')
  public lastname: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public registeredOn: Date;



  @OneToMany(type => Project, project => project.manager)
  public projects: Project[]

  @OneToMany(type => Employee, employee => employee.managedBy)
  public subordinates: Employee[];

  @Column({ type: 'enum', enum: WorkPosition, default: WorkPosition.employee })
  public position: WorkPosition;

  // is this a self-relationship?
  // @OneToOne(type => User, user => user.lastname)
  // public managedBy: User;

  // I don't think this field is necessary
  // @OneToMany(type => Contribution, contribution => contribution.)
  // public contributions: Contribution[]

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password;
  }
}