import { EntityRepository, Repository } from "typeorm";
import { Skill } from "src/database/entities/skill.entity";
import { ConflictException } from "@nestjs/common";

@EntityRepository(Skill)
export class SkillRepository extends Repository<Skill> {

    public async matchExistingSkill(skillName: string): Promise<void> {
        const matchSkill: Skill = await this.findOne({
            where: { skillName: skillName }
        });
        if (matchSkill) {
            throw new ConflictException(`Skill ${skillName} exists in catalog.`)
        }
    }
    
    public async getSkillByName(skillName: string): Promise<Skill> {
        return this.findOne({ where: { skillName: skillName }});
    }
}