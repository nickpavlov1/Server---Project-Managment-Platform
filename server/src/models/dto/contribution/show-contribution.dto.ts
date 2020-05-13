import { User } from './../../../database/entities/user.entity';
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
    @Transform((_, obj) => (obj as any).email)
    public contributor: User;

    // @Expose()
    // public requirement: Requirement;

}