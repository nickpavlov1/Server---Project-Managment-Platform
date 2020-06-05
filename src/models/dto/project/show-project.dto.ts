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
  public dailyHourlyManagerContribution: number;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public statusCompleted: boolean;

  @Expose()
  public createdOn: Date;

  @Expose()
  public updatedOn: Date;

  @Expose()
  public finishesOn: Date;

  @Expose()
  public dueDate: Date;

  @Expose()
  public isStopped: boolean;

  @Expose()
  @Type(() => UserDTO)
  public manager: UserDTO;

  @Expose()
  @Type(() => ShowRequirementDTO)
  public requirements: ShowRequirementDTO;
}