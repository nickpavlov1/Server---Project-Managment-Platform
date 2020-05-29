import { ShowProjectDTO } from 'src/models/dto/project/show-project.dto';
import { ShowContributionDTO } from '../contribution/show-contribution.dto';
import { Skill } from '../../../database/entities/skill.entity';
import { Expose, Transform, Type } from 'class-transformer';
import { SkillDTO } from '../skill/skill.dto'

export class ShowRequirementDTO {
    @Expose()
    public id: string;

    // @Expose()
    // @Transform((_, obj) => {
    //     if ((obj as any).requiredSkill == undefined) {
    //         return []
    //     } else {
    //         return (obj as any).requiredSkill.skillName
    //     }
    // })
    // public requiredSkill: string;

    @Expose()
    public statusCompleted: boolean;

    @Expose()
    public requiredTime: number;

    @Expose()
    public totalContributedTime: number;

    @Expose()
    public totalDailyWorkInput: number;

    @Expose()
    public createdOn: Date;

    @Expose()
    public requirementEnd: Date;

    @Expose()
    public updatedOn: Date;

    @Expose()
    public isDeleted: boolean;

    @Expose()
    @Type(() => SkillDTO)
    public requiredSkill: SkillDTO;

    @Expose()
    @Type(() => ShowContributionDTO)
    public contributions: ShowContributionDTO;

    @Expose()
    @Type(() => ShowProjectDTO)
    public project: ShowProjectDTO;

}