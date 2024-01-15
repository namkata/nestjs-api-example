import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', () => {
      const posts = [
        { id: 1, title: 'Test Post', content: 'This is a test post' },
      ];
      jest.spyOn(service, 'findAll').mockReturnValue(posts);

      expect(controller.findAll()).toEqual(posts);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if post with given id does not exist', () => {
      const nonExistentId = 999; // Assuming 999 doesn't exist
      jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new NotFoundException(`Post with id ${nonExistentId} not found`);
      });

      expect(() => controller.findOne(nonExistentId)).toThrowError(
        NotFoundException,
      );
    });

    it('should return the post if it exists', () => {
      const post = {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post',
      };
      jest.spyOn(service, 'findOne').mockReturnValue(post);

      expect(controller.findOne(post.id)).toEqual(post);
    });
  });

  describe('create', () => {
    it('should create a post and return it', () => {
      const postDto: CreatePostDto = {
        title: 'Test Post',
        content: 'This is a test post',
        createdAt: new Date(),
      };

      const createdPost = { ...postDto, id: 1 };
      jest.spyOn(service, 'create').mockReturnValue(createdPost);

      expect(controller.create(postDto)).toEqual(createdPost);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if post with given id does not exist', () => {
      const nonExistentId = 999; // Assuming 999 doesn't exist
      const updateDto: UpdatePostDto = {
        title: 'Updated Post',
        content: 'This is an updated post',
      };

      jest.spyOn(service, 'update').mockImplementation(() => {
        throw new NotFoundException(`Post with id ${nonExistentId} not found`);
      });

      expect(() => controller.update(nonExistentId, updateDto)).toThrowError(
        NotFoundException,
      );
    });

    it('should update and return the post if it exists', () => {
      const post = {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post',
      };
      const updateDto: UpdatePostDto = {
        title: 'Updated Post',
        content: 'This is an updated post',
      };

      jest.spyOn(service, 'update').mockReturnValue({ ...post, ...updateDto });

      expect(controller.update(post.id, updateDto)).toEqual({
        ...post,
        ...updateDto,
      });
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if post with given id does not exist', () => {
      const nonExistentId = 999; // Assuming 999 doesn't exist
      jest.spyOn(service, 'remove').mockImplementation(() => {
        throw new NotFoundException(`Post with id ${nonExistentId} not found`);
      });

      expect(() => controller.remove(nonExistentId)).toThrowError(
        NotFoundException,
      );
    });

    it('should remove and return the post if it exists', () => {
      const post = {
        id: 1,
        title: 'Test Post',
        content: 'This is a test post',
      };
      jest.spyOn(service, 'remove').mockReturnValue(post);

      expect(controller.remove(post.id)).toEqual(post);
    });
  });
});
