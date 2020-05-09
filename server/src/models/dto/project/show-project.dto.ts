import { Expose } from 'class-transformer';

export class ShowProjectDTO {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public statusCompleted: boolean;

  @Expose()
  public due: number;

  @Expose()
  public createdOn: Date;

  @Expose()
  public updatedOn: Date;

  @Expose()
  public isStopped: boolean;

  @Expose()
  public manager: string;

}