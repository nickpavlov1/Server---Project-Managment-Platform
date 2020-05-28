import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import * as moment from 'moment';
import { HttpException } from '@nestjs/common';

export class CreateContributionDTO {  
    @IsString()
    @IsNotEmpty()
    public userEmail: string;
  
    @IsNumber()
    public dailyHourlyContribution: number;

    @IsString()
    // @Transform(value => {
    //     if (!moment(value, ['YYYY-MM-DD']).isValid()) {
    //       throw new HttpException(
    //         'The Todo should have a valid due property in format YYYY-MM-DD',
    //         400,
    //       );
    //     }
    
    //     return value;
    //   })
    public contributionEnd: string;
    
}