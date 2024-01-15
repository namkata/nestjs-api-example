import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an empty array initially', () => {
      const result = service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a post with an incremented id and return it', () => {
      const postDto: CreatePostDto = {
        title: 'Test Post',
        content: 'This is a test post',
        createdAt: new Date(),
      };

      const result = service.create(postDto);
      expect(result).toHaveProperty('id', 1);
      expect(result.title).toEqual(postDto.title);
      expect(result.content).toEqual(postDto.content);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if post with given id does not exist', () => {
      const nonExistentId = 999; // Assuming 999 doesn't exist
      expect(() => service.findOne(nonExistentId)).toThrowError(
        NotFoundException,
      );
    });

    it('should return the post if it exists', () => {
      const postDto: CreatePostDto = {
        title: 'Test Post',
        content: 'This is a test post',
        createdAt: new Date(),
      };
      const createdPost = service.create(postDto);
      const result = service.findOne(createdPost.id);
      expect(result).toEqual(createdPost);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if post with given id does not exist', () => {
      const nonExistentId = 999; // Assuming 999 doesn't exist
      const updateDto: UpdatePostDto = {
        title: 'Updated Post',
        content: 'This is an updated post',
      };
      expect(() => service.update(nonExistentId, updateDto)).toThrowError(
        NotFoundException,
      );
    });

    it('should update and return the post if it exists', () => {
      const postDto: CreatePostDto = {
        title: 'Test Post',
        content: 'This is a test post',
        createdAt: new Date(),
      };
      const createdPost = service.create(postDto);

      const updateDto: UpdatePostDto = {
        title: 'Updated Post',
        content: 'This is an updated post',
      };

      const result = service.update(createdPost.id, updateDto);
      expect(result).toHaveProperty('id', 1);
      expect(result.title).toEqual(updateDto.title);
      expect(result.content).toEqual(updateDto.content);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if post with given id does not exist', () => {
      const nonExistentId = 999; // Assuming 999 doesn't exist
      expect(() => service.remove(nonExistentId)).toThrowError(
        NotFoundException,
      );
    });

    it('should remove and return the post if it exists', () => {
      const postDto: CreatePostDto = {
        title: 'Test Post',
        content: 'This is a test post',
        createdAt: new Date(),
      };
      const createdPost = service.create(postDto);

      const result = service.remove(createdPost.id);
      expect(result).toEqual(createdPost);
      expect(service.findAll()).toEqual([]); // Ensure the post has been removed
    });
  });
});
