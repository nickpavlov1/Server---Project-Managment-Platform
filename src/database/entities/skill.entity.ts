import { Requirement } from './requirement.entity';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Employee } from './employee.entity';


@Entity()
export class Skill extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'nvarchar', nullable: false })
  public skillName: string;

  @ManyToOne(type => Employee, employee => employee.skillset)
  public employee: Employee;

  @OneToMany(type => Requirement, requirement => requirement.requiredSkill)
  public requirements: Requirement[];
}