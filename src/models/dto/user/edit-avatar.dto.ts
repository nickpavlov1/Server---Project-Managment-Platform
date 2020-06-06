import { IsNotEmpty, IsString } from "class-validator";

export class EditAvatarDTO {

    @IsNotEmpty()
    @IsString()
    avatarUrl: string;
}