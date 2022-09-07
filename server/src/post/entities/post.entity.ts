import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '해당 컬럼은 게시글의 제목을 나타냅니다.',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 200,
    comment: '해당 컬럼은 게시글의 내용을 나타냅니다.',
  })
  content: string;

  @Column({
    type: 'varchar',
    length: 60,
    comment: '해당 컬럼은 (암호화된) 비밀번호를 나타냅니다.',
  })
  password: string;

  @CreateDateColumn({
    comment: '해당 컬럼은 게시글 생성 시간을 나타냅니다.',
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: '해당 컬럼은 게시글 수정 시간을 나타냅니다.',
  })
  updatedAt: Date;

  @Column({
    type: 'bool',
    default: false,
    comment: '해당 컬럼은 게시글이 삭제됐는지 여부를 나타냅니다.',
  })
  isDeleted: boolean;
}
