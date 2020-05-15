import { Contribution } from 'src/database/entities/contribution.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToOne, ManyToOne, OneToMany } from "typeorm";
import { Skill } from "./skill.entity";
import { User } from "./user.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('nvarchar')
    email: string;

    @Column('nvarchar')
    public jobTitle: string;
  
    @Column('nvarchar')
    public jobDescription: string;
  

    @Column({ nullable: true, default: 8 })
    public availableWorkHours: number
  
    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    public registeredOn: Date;
    
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    public updatedOn: Date;

    @ManyToMany(type => Skill, { eager: true })
    @JoinTable()
    public skillset: Skill[];

    @ManyToOne(type => User, user => user.lastname)
    public managedBy: User;

    @OneToMany(type => Contribution, contribution => contribution.contributor)
    public contributions: Contribution[];
}