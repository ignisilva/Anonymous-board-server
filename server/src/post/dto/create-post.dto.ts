import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Matches, MaxLength } from 'class-validator';
import { ResponseDto } from 'src/common/dto';
import { Post } from '../entities';

export class CreatePostDto {
  @IsString({ message: 'title은 문자열이어야 합니다.' })
  @MaxLength(20, { message: 'title은 최대 20자 이내 입니다.' })
  title: string;

  @IsString({ message: 'content는 문자열이어야 합니다.' })
  @MaxLength(200, { message: 'content는 최대 200자 이내 입니다.' })
  content: string;

  @IsString({ message: 'password는 문자열이어야 합니다.' })
  @Matches(/^(?=.*?[0-9]).{6,}$/, {
    message: 'password는 최소 6자 이상이며, 숫자가 1개 이상 포함되어야 합니다.',
  })
  password: string;
}

class CreatePostResult {
  @ApiProperty({ description: '게시글 id 입니다. ' })
  id: number;
}

export class CreatePostResponseDto extends ResponseDto {
  data?: CreatePostResult;
}
