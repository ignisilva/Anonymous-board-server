import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty({ description: 'Http Status Code를 나타냅니다.' })
  statusCode: HttpStatus;

  @ApiPropertyOptional({ description: '응답에 대한 설명입니다.' })
  message?: string;

  @ApiPropertyOptional({ description: 'error에 대한 내용입냅니다.' })
  error?: string;
}
