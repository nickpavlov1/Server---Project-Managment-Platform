import { Expose } from 'class-transformer';

export class ShowRequirementDTO {
    @Expose()
    public id: string;

    @Expose()
    public skill: string;
  
    @Expose()
    public statusCompleted: boolean;

    @Expose()
    public requiredTime: number;

    @Expose()
    public contributedTime: number;

    @Expose()
    public totalDailyWorkInput: number;

    @Expose()
    public createdOn: Date;
  
    @Expose()
    public updatedOn: Date;

}