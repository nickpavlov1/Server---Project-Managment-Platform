import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Skill extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    skillName: string;

    @ManyToOne(type => User, user => user.skills )
    user: string;
}