import { Employee } from 'src/database/entities/employee.entity';
import { Expose, Transform } from 'class-transformer';

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
    @Transform((_, obj) => (obj as any).contributor.email)
    public contributor: Employee;

    // @Expose()
    // public requirement: Requirement;

}