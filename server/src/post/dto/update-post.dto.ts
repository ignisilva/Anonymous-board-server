import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { ResponseDto } from 'src/common/dto';

export class UpdatePostDto {
  @IsOptional()
  @IsString({ message: 'title은 문자열이어야 합니다.' })
  @MaxLength(20, { message: 'title은 최대 20자 이내 입니다.' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'content는 문자열이어야 합니다.' })
  @MaxLength(200, { message: 'content는 최대 200자 이내 입니다.' })
  content?: string;

  @IsOptional()
  @IsString({ message: 'password는 문자열이어야 합니다.' })
  @Matches(/^(?=.*?[0-9]).{6,}$/, {
    message: 'password는 최소 6자 이상이며, 숫자가 1개 이상 포함되어야 합니다.',
  })
  password?: string;
}

export class UpdatePostResponseDto extends ResponseDto {}
