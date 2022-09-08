import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CheckPostPasswordDto,
  CheckPostPasswordResponseDto,
  CreatePostDto,
  CreatePostResponseDto,
  FindPostsResponseDto,
  RemovePostResponseDto,
  UpdatePostDto,
  UpdatePostResponseDto,
} from './dto';
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

  @HttpCode(200)
  @Post(':id/check-password')
  @ApiOperation({
    summary: '게시글 비밀번호 일치 확인 API',
    description: '게시글의 비밀번호 일치 여부를 확인합니다.',
  })
  @ApiOkResponse({
    description: '게시글 비밀번호 일치 여부 결과입니다.',
    type: CheckPostPasswordResponseDto,
  })
  @ApiParam({ name: 'id', description: '게시글 id' })
  async checkPassword(
    @Body() checkPostPasswordDto: CheckPostPasswordDto,
    @Param('id') id: string,
  ): Promise<CheckPostPasswordResponseDto> {
    const isCorrect = await this.postService.checkPassword(
      checkPostPasswordDto,
      Number(id),
    );

    return {
      statusCode: HttpStatus.OK,
      data: { isCorrect },
    };
  }

  @Get()
  @ApiOperation({
    summary: '게시글 목록 조회 API',
    description: '게시글을 목록을 조회합니다.',
  })
  @ApiOkResponse({
    description: '게시글 목록 조회 결과입니다.',
    type: FindPostsResponseDto,
  })
  @ApiQuery({
    name: 'last_id',
    required: false,
    description: '마지막 게시글 id',
  })
  async find(@Query('last_id') lastId: string): Promise<FindPostsResponseDto> {
    const posts = await this.postService.find(Number(lastId));

    return {
      statusCode: HttpStatus.OK,
      data: posts,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정 API',
    description: '게시글을 수정합니다.',
  })
  @ApiOkResponse({
    description: '게시글 수정 결과입니다.',
    type: UpdatePostResponseDto,
  })
  @ApiParam({ name: 'id', description: '게시글 id' })
  async update(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: string,
  ): Promise<UpdatePostResponseDto> {
    await this.postService.update(updatePostDto, Number(id));

    return {
      statusCode: HttpStatus.OK,
      message: '게시글 수정 완료',
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시글 삭제 API',
    description: '게시글을 삭제합니다.',
  })
  @ApiOkResponse({
    description: '게시글 삭제 결과입니다.',
    type: RemovePostResponseDto,
  })
  @ApiParam({ name: 'id', description: '게시글 id' })
  async remove(@Param('id') id: string): Promise<RemovePostResponseDto> {
    await this.postService.remove(Number(id));

    return {
      statusCode: HttpStatus.OK,
      message: '게시글 삭제 완료',
    };
  }
}
