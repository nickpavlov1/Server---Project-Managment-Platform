import { ShowProjectDTO } from 'src/models/dto/project/show-project.dto';
import { Expose, Type } from 'class-transformer';
import { WorkPosition } from '../../enums/work-position.emun';
import { EmployeeDTO } from '../employee/employee.dto';
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

    @Expose()
    @Type(() => EmployeeDTO)
    public employeeSubordinates: EmployeeDTO;

    @Expose()
    @Type(() => UserDTO)
    public managerSubordinates: UserDTO;
  }