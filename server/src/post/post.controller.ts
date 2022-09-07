import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostDto, CreatePostResponseDto } from './dto';
import { PostService } from './post.service';

@ApiTags('Posts API')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({
    summary: '게시글 생성 API',
    description: '게시글을 생성합니다.',
  })
  @ApiCreatedResponse({
    description: '게시글을 생성 결과입니다.',
    type: CreatePostResponseDto,
  })
  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<CreatePostResponseDto> {
    const post = await this.postService.create(createPostDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: { id: post.id },
    };
  }
}
