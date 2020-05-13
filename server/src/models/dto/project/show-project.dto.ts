import { Expose, Transform } from 'class-transformer';
import { User } from 'src/database/entities/user.entity';

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
  @Transform((_, obj) => (obj as any).manager)
  public manager: User;

  @Expose()
  @Transform((_, obj) => {
    if ((obj as any).requirements == undefined) {
      return []
    } else {
      return (obj as any).requirements.map(el => el.id);
    }
  })
  public requirements: string;

}