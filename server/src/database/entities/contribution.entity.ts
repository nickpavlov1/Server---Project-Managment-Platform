import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Requirement } from './requirement.entity';
import { Employee } from './employee.entity';

@Entity()
export class Contribution {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ default: 0 })
    public dailyHourlyContribution: number;

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

    @ManyToOne(type => Employee, employee => employee.id)
    public contributor: Promise<Employee>;

    @ManyToOne(type => Requirement, requirement => requirement.id)
    public requirement: Promise<Requirement>;
}