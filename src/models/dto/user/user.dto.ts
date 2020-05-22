import { Expose } from 'class-transformer';
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
    registered: Date;

    @Expose()
    updated: Date;

    @Expose()
    position: WorkPosition;
    
    @Expose()
    directManager: string;
  }