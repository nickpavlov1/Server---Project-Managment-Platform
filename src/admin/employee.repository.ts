import { Employee } from '../database/entities/employee.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { EmployeeDTO } from 'src/models/dto/employee/employee.dto';
import { plainToClass } from 'class-transformer';
@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

    public async matchEmail(email: string): Promise<void> {
      const matchEmail = await this.findOne({ 
      where: { email: email }
      });
      if (matchEmail) {
        throw new ConflictException(`This email ${email} is already taken!`);
        }
    }

    public async viewEmployeeById(employeeId: string): Promise<EmployeeDTO> {
      const foundEmployee: Employee = await this.findOne(employeeId);
          if (!foundEmployee) {
          throw new NotFoundException(`Employee does not exist.`);
          }
          return plainToClass(EmployeeDTO, foundEmployee, { excludeExtraneousValues: true });
  }
}