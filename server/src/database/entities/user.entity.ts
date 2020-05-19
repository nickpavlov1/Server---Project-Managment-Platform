import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, OneToMany, CreateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Project } from "./project.entity";
import { WorkPosition } from '../../models/enums/work-position.emun';
import { Employee } from './employee.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public password: string;

  @Column()
  public salt: string;

  @Column('nvarchar')
  public jobTitle: string;

  @Column('nvarchar', { nullable: true, default: null })
  public jobDescription: string;

  @Column('nvarchar')
  public email: string;

  @Column('nvarchar')
  public firstName: string;

  @Column('nvarchar')
  public lastName: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public registeredOn: Date;

  @OneToMany(type => Project, project => project.manager)
  public projects: Project[]

  @OneToMany(type => Employee, employee => employee.managedBy)
  public subordinates: Employee[];

  @Column({ type: 'enum', enum: WorkPosition, default: WorkPosition.manager })
  public position: WorkPosition;

  @Column({ nullable: true, default: 8 })
  public availableWorkHours: number;

  @Column({default: 'self-managed'})
  directManager: string;
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt)
    return hash === this.password;
  }
}