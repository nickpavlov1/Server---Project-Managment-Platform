import { EmployeeDTO } from './../employee/employee.dto';
import { Employee } from 'src/database/entities/employee.entity';
import { Expose, Transform, Type } from 'class-transformer';
import { UserDTO } from '../user/user.dto';

export class ShowContributionDTO {
    @Expose()
    public id: string;

    @Expose()
    public dailyHourlyContribution: number;

    @Expose()
    public createdOn: Date;

    @Expose()
    public updatedOn: Date;

    @Expose()
    public isDeleted: boolean;

    @Expose()
    @Type(() => EmployeeDTO)
    public contributor: EmployeeDTO;

    // @Expose()
    // @Transform((_, obj) => (obj as any).contributor.email)
    // public contributor: Employee;

    // @Expose()
    // public requirement: Requirement;

}