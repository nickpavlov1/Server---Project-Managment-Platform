import { Requirement } from './requirement.entity';
import { BaseEntity } from "typeorm";
import { Employee } from './employee.entity';
export declare class Skill extends BaseEntity {
    id: string;
    skillName: string;
    employee: Employee;
    requirements: Requirement[];
}
