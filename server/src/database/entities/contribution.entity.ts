import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Requirement } from './requirement.entity';

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

    @Column({ nullable: true, type: 'timestamp' })
    public contributionEnd: Date;

    @Column({ default: false })
    public isDeleted: boolean;

    // @ManyToOne(type => User, user => user.contributions)
    // public contributor: User;

    @ManyToOne(type => Requirement, requirement => requirement.contributions)
    public requirement: Requirement;
}