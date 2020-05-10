import { createConnection, Repository } from "typeorm";
import { Skill } from '../entities/skill.entity';
import { SkillCatalog } from '../../models/enums/skill-catalog.enum';




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

        await seedSkills(connection);
        
        await connection.close();
        console.log('Seed completed!');
};
main().catch(console.error);