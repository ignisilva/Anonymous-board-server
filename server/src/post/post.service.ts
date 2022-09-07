import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { Repository } from 'typeorm';
import { CheckPostPasswordDto, CreatePostDto } from './dto';
import { UpdatePostDto } from './dto/update-post.dto';
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

  /**
   * 게시글의 비밀번호와 요청온 비밀번호의 일치 여부를 확인한다.
   * @param { checkPostPasswordDto } 게시글 비밀번호 일치 여부 확인 Dto
   * @param { id } 게시글 id
   * @returns { boolean } 일치 여부(T/F)
   */
  async checkPassword(
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

  /**
   * 게시글을 수정한다.
   * @param { updatePostDto } 게시글 수정 Dto
   * @param { id } 게시글 id
   */
  async update(updatePostDto: UpdatePostDto, id: number): Promise<void> {
    const { title, content, password } = updatePostDto;

    const post = await this.postRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    if (password) {
      post.password = await this.encryptService.hash(password);
    }

    await this.postRepository.save(post);
  }

  /**
   * 게시글을 수정한다.
   * @param { id } 게시글 id
   */
  async remove(id: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    post.isDeleted = true;

    await this.postRepository.save(post);
  }
}
