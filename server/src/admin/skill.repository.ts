import { EntityRepository, Repository } from "typeorm";
import { Skill } from "src/database/entities/skill.entity";
import { ConflictException } from "@nestjs/common";

@EntityRepository(Skill)
export class SkillRepository extends Repository<Skill> {

    public async matchExistingSkill(newSkill: string): Promise<void> {
        const matchSkill: Skill = await this.findOne({
            where: { skillName: newSkill }
        });
        if (matchSkill) {
            throw new ConflictException(`Skill ${newSkill} exists in catalog.`)
        }
    }
    
    // public async matchAndAddSkillsToEmployeeAcc() {}
}