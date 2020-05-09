import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, JoinTable } from "typeorm";
import { WorkPosition } from "src/models/enums/work-position.emun";
import { User } from "./user.entity";

@Entity()

export class Position {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public workPosition: WorkPosition;

    @OneToOne(type => User, user => user.position)
    public user: Promise<User>
}