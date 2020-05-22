import { IsNotEmpty, IsString } from "class-validator";

export class EditAvatarUserDTO {

    @IsNotEmpty()
    @IsString()
    avatarUrl: string;
}