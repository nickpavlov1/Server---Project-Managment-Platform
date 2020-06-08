import { createConnection, Repository } from "typeorm";
import { Skill } from '../entities/skill.entity';
import { SkillCatalog } from '../../models/enums/skill-catalog.enum';
import { User } from "../entities/user.entity";
import * as bcrypt from 'bcrypt';
import { WorkPosition } from '../../models/enums/work-position.emun';




    const seedAdmin = async (connection: any) => {
      const userRepository: Repository<User> = connection.manager.getRepository(User)
              
      const nikolay = await userRepository.findOne({
        where: {
          email: 'nickpavlov@admin.com',
        },
      });
  
      if (!nikolay) {
      const admin = new User();
      admin.email = 'nickpavlov@admin.com';
      admin.salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash('Password123!', admin.salt);
      admin.password = passwordHash;
      admin.firstName = 'Nikolay';
      admin.lastName = 'Pavlov';
      admin.jobTitle = 'Seeded Admin'
      admin.jobDescription = "For Tsting Purposes"
      admin.position = WorkPosition.admin;
      
      await userRepository.save(admin);

      console.log('Admin seeded to DB!')
      } else {
        console.log(`Admin is in the database.`);
      }
    }

    const seedSkills = async (connection: any) => {
        const skillRepository: Repository<Skill> = connection.manager.getRepository(Skill);
      
        const skills: Skill[] = await skillRepository.find();
        if (skills.length) {
          console.log('Skills are currently in the DB');
          return;
        }
      
        const skillsSeeding: Promise<Skill>[] = Object.keys(SkillCatalog).map(
          async (skillName: string) => {
              const skill: Skill = skillRepository.create({ skillName });
              return await skillRepository.save(skill)
            }
        );
        await Promise.all(skillsSeeding)
        console.log('Seeded skills successfully!');
      };


      const main = async () => {
        const connection = await createConnection({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'pm-platform',
                entities: [ "./src/database/entities/**/*.ts" ],
            });


        await seedAdmin(connection);
        await seedSkills(connection);
        
        await connection.close();
        console.log('Seed completed!');
};
main().catch(console.error);