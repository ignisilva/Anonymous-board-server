import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength } from 'class-validator';
import { ResponseDto } from 'src/common/dto';

export class CheckPostPasswordDto {
  @IsString({ message: 'password는 문자열이어야 합니다.' })
  @Matches(/^(?=.*?[0-9]).{6,}$/, {
    message: 'password는 최소 6자 이상이며, 숫자가 1개 이상 포함되어야 합니다.',
  })
  password: string;
}

class CheckPostPasswordResult {
  @ApiProperty({ description: 'password 일치/불일치 결과입니다.' })
  isCorrect: boolean;
}

export class CheckPostPasswordResponseDto extends ResponseDto {
  data?: CheckPostPasswordResult;
}
