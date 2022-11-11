import { Module } from '@nestjs/common';
import { TodoUserService } from './todo-user.service';
import { TodoDataUserResolver, TodoImageResolver, TodoUserResolver } from './todo-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoImageEntity, TodoListEntity, UserSignup } from './entity/todo-user.entity';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([UserSignup, TodoListEntity, TodoImageEntity]), AuthModule],
  providers: [TodoUserResolver, TodoUserService, TodoDataUserResolver, TodoImageResolver],
  exports: [TodoUserResolver, TodoUserService, TodoDataUserResolver, TodoImageResolver]
})
export class TodoUserModule { }
