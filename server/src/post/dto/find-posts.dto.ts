import { ResponseDto } from 'src/common/dto';
import { Post } from '../entities';

export class FindPostsResponseDto extends ResponseDto {
  data?: Post[];
}
