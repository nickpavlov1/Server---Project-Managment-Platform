import { Expose } from 'class-transformer';
import { WorkPosition } from '../../enums/work-position.emun';
export class UserDTO {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    registered: Date;

    @Expose()
    updated: Date;

    @Expose()
    role: WorkPosition;

    
  }