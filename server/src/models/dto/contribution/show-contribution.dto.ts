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

    // @Expose()
    // public contributor: User;

    // @Expose()
    // public requirement: Requirement;

}