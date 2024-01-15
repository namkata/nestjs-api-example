import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const environment = process.env.NODE_ENV || 'development';

let additionalModules = [];

// Include test-specific modules in the testing environment
if (environment === 'testing') {
  additionalModules = [PostsModule];
}

@Module({
  imports: [PostsModule, ...additionalModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
