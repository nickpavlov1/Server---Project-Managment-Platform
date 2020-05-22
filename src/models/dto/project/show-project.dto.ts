import { UserDTO } from '../user/user.dto';
import { ShowRequirementDTO } from '../requirement/show-requirement.dto';
import { Requirement } from 'src/database/entities/requirement.entity';
import { Expose, Transform, Type } from 'class-transformer';
import { User } from 'src/database/entities/user.entity';
import "reflect-metadata";

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
  @Type(() => UserDTO)
  public manager: UserDTO;

  // @Expose()
  // @Transform((_, obj) => (obj as any).manager)
  // public manager: User;

  @Expose()
  @Type(() => ShowRequirementDTO)
  public requirements: ShowRequirementDTO;

  // @Expose()
  // @Transform((_, obj) => {
  //   if ((obj as any).requirements == undefined) {
  //     return []
  //   } else {
  //     return (obj as any).requirements;
  //   }
  // })
  // public requirements: Requirement;

}