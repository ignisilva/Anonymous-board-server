import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { Repository } from 'typeorm';
import { CheckPostPasswordDto, CreatePostDto } from './dto';
import { Post } from './entities';

/**
 * 해당 클래스는 PostService를 정의합니다.
 */
@Injectable()
export class PostService {
  /**
   * 생성자
   * @param { postRepository } 게시글 레포지토리
   */
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly encryptService: EncryptService,
  ) {}

  /**
   * 게시글을 생성한다.
   * @param { createPostDto } 게시글 생성 Dto
   * @returns { Post } 게시글 정보
   */
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { password } = createPostDto;

    const hashedPassword = await this.encryptService.hash(password);

    const postData = this.postRepository.create({
      ...createPostDto,
      password: hashedPassword,
    });

    const post = await this.postRepository.save(postData);

    return post;
  }

  async checkPostPassword(
    checkPostPasswordDto: CheckPostPasswordDto,
    id: number,
  ): Promise<boolean> {
    const { password } = checkPostPasswordDto;

    const post = await this.postRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
      select: { password: true },
    });

    const isCorrect = await this.encryptService.compare(
      password,
      post.password,
    );

    return isCorrect;
  }
}
