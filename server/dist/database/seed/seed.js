"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const skill_entity_1 = require("../entities/skill.entity");
const skill_catalog_enum_1 = require("../../models/enums/skill-catalog.enum");
const seedSkills = async (connection) => {
    const skillRepository = connection.manager.getRepository(skill_entity_1.Skill);
    const skills = await skillRepository.find();
    if (skills.length) {
        console.log('Skills are currently in the DB');
        return;
    }
    const skillsSeeding = Object.keys(skill_catalog_enum_1.SkillCatalog).map(async (skillName) => {
        const skill = skillRepository.create({ skillName });
        return await skillRepository.save(skill);
    });
    await Promise.all(skillsSeeding);
    console.log('Seeded skills successfully!');
};
const main = async () => {
    const connection = await typeorm_1.createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'pm-platform',
        entities: ["./src/database/entities/**/*.ts"],
    });
    await seedSkills(connection);
    await connection.close();
    console.log('Seed completed!');
};
main().catch(console.error);
//# sourceMappingURL=seed.js.map