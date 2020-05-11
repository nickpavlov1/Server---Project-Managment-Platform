import { Expose, Transform } from 'class-transformer';

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

  @Expose()
  @Transform((_, obj) => {
    console.log(obj.requirements as any)
    if ((obj as any).requirements == undefined) {
      return []
    } else {
      return (obj as any).requirements.map(el => el.id);
    }
  })
  public requirements: string;

}