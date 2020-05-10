import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Skill extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'nvarchar', nullable: false })
    public skillName: string;

    @ManyToOne(type => User, user => user.skills)
      public employee: User;
}