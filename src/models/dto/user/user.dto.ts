import { ShowProjectDTO } from 'src/models/dto/project/show-project.dto';
import { Expose, Type } from 'class-transformer';
import { WorkPosition } from '../../enums/work-position.emun';
export class UserDTO {
    @Expose()
    id: string;

    @Expose()
    avatarUrl: string;

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    jobTitle: string;

    @Expose()
    jobDescription: string;

    @Expose()
    registeredOn: Date;

    @Expose()
    position: WorkPosition;
    
    @Expose()
    directManager: string;

    @Expose()
    availableWorkHours: number;

    @Expose()
    @Type(() => ShowProjectDTO)
    public projects: ShowProjectDTO;
  }