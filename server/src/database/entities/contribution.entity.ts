import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Requirement } from './requirement.entity';

@Entity()
export class Contribution {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public dailyHourlyWorkInput: number;

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

    @ManyToOne(type => User, user => user.id)
    public contributor: Promise<User>;

    @ManyToOne(type => Requirement, requirement => requirement.id)
    public requirement: Promise<Requirement>;
}