import { IsNotEmpty, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title of post can be empty' })
  title: string;
  @IsNotEmpty({ message: 'Content of post can be empty' })
  @Length(10, 500, {
    message: 'Post must be larger than 10 letter and less than 500 letter',
  })
  content: string;
}
