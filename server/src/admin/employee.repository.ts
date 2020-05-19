import { Employee } from '../database/entities/employee.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
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

}